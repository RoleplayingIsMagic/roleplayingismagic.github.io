#!/usr/bin/env python3
# Roleplaying is Magic S4E Website Postbuild Script
# This removes unneeded directories, based on what our config script did and didn't build

import os
import os.path
import shutil

print('Running Postbuild')

# check our deps
import sys
if sys.version_info.major < 3:
	print('You require Python3 to run this script')
	exit()

try:
	import yaml
except ImportError:
	print('You require PyYAML to run this script')
	exit()

# change to our directory
abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

# load config
with open('_config.yml') as f:
	config = yaml.load(f.read())

dirs = [
	['watercolours', os.path.join(config['destination'], 'cl', 'img', 'watercolours')],

	['s4e', os.path.join(config['destination'], 'rules', 's4e')],
	['s4e_pdf', os.path.join(config['destination'], 'rules', 's4e', 's4e.pdf')],

	['s3e', os.path.join(config['destination'], 'rules', 's3e')],
	['s3e_pdf', os.path.join(config['destination'], 'rules', 's3e', 's3e.pdf')],

	['s2e', os.path.join(config['destination'], 'rules', 's2e')],
	['s2e_pdf', os.path.join(config['destination'], 'rules', 's2e', 's2e.pdf')],

	['s1e', os.path.join(config['destination'], 'rules', 's1e')],

	['rules', os.path.join(config['destination'], 'rules')],
]

print('  Removing unneeded files and folders')

for config_entry, path in dirs:
	path = os.path.abspath(path)
	display_entry = config_entry.replace('_', ' ').title()

	if config.get(config_entry, True):
		# print('keeping', display_entry)
		pass
	else:
		if os.path.exists(path):
			print('removing', display_entry, os.path.abspath(path))
			if os.path.isdir(path):
				shutil.rmtree(path)
			else:
				os.remove(path)
		else:
			print(display_entry, 'does not exist, skipping')

# change to output dir, so we can (possibly) do svg -> png
abspath = os.path.abspath(config['destination'])
os.chdir(abspath)

if config.get('convert_svg_to_png', False):
	print('  Converting SVG files to PNG!')
	print('    Please make sure you have ImageMagik installed and on your command line!')
	print('    Please note: Because of the supersampling we use to get nicely anti-aliased images, this may take a while.')

	import subprocess

	for root, dirs, files in os.walk(abspath):
		for filename in files:
			full_filename = os.path.join(root, filename)

			if 'font' not in filename:  # svg webfonts or fonts css, we don't wanna mess with them
				if filename.endswith('html') or filename.endswith('css'):
					# move original file to temp name
					original_filename = filename + '.rim_postbuild_temp'
					os.rename(full_filename, original_filename)

					# rewrite new file line-by-line
					with open(original_filename, 'r') as original:
						with open(full_filename, 'w') as new:
							for line in original:
								# we really, /really/ don't wanna screw up webfonts, do this check
								if 'webfont' in line:
									new.write(line)
								else:
									newline = line.replace('.svg', '.png')
									if filename.endswith('css'):
										newline = newline.replace('radial', 'linear')
									new.write(newline)

					# and remove original
					os.remove(original_filename)

				elif filename.endswith('svg'):
					# So, that convert call asks ImageMagik's converter to make the svg png
					# -background option for transparent bg
					# -density and -resize so we actually get anti-aliasing >_>
					subprocess.call(['convert', '-background', 'none', '-density', '288', '-resize', '25%', full_filename, full_filename.replace('.svg', '.png')])
					os.remove(full_filename)  # delete old svg file
