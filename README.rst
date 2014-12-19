Roleplaying is Magic Portable Website
=====================================
This is the Roleplaying is Magic portable website, hosted `on Github Pages <http://roleplayingismagic.github.io/>`_.


Building
--------
This website uses `Compass+SASS <http://compass-style.org/install/>`_ and `Jekyll <http://jekyllrb.com/>`_ to generate a static site that can be hosted very easily on static hosting, or even distributed as something like a zip file!

I find it's good to have two shells open. Go to the base directory on both shells.

------

In the first shell, start `Compass <http://compass-style.org/>`_::

    $ compass watch

Compass makes sure that the source SASS files in the `/_sass` folder get compiled to `css` files when changed. This is basically necessary when doing development, as the website style files are likely to be changed a lot while developing.

------

In the second shell, start `Jekyll <http://jekyllrb.com/>`_::

    $ jekyll watch

Jekyll actually creates the output HTML files and the output site. This command, `watch`, also hosts it on `http://localhost:4000/ <http://localhost:4000/>`_, for easy access.

While Jekyll is designed to completely regenerate all necessary files when things are changed, it may be necessary to stop and restart Jekyll as it can get 'stuck' and not regenerate everything properly sometimes. Just if things mess up, if you want to be 100% sure you're getting a clean site compile, or if things just start to act a bit strangely.

While you have these two commands open, the site will be both hosted on `http://localhost:4000/ <http://localhost:4000/>`_ and will be generated in the `/_site` folder.


Packaging
---------
If you wish to generate a clean site for packaging in a zip file or similar, I recommend deleting the `/_site` folder and then running the Compass and Jekyll compile/build commands as such::

    $ rm -rf _site

    $ compass compile
    unchanged _sass/fonts.sass
    unchanged _sass/ie.sass
    unchanged _sass/print.sass
    unchanged _sass/screen.sass

    $ jekyll build
    Configuration file: somefolder/_config.yml
                Source: somefolder
           Destination: _site/
          Generating...
                        done.
     Auto-regeneration: disabled. Use --watch to enable.

    $ ./_postbuild.py
    Running Postbuild
      Removing unneeded files and folders
      Converting SVG files to PNG!
        Please make sure you have ImageMagik installed and on your command line!
        Please note: Because of the supersampling we use to get nicely anti-aliased images, this may take a while.

`_postbuild.py` is a post-build script that I developed to do some things:

* Delete unnecessary folders/files (eg: S3E rules if we don't build with them)

* Converting our SVG files to PNG files if required (speeds up slower machines, and browsers that are slower with SVGs)

Using the Postbuild script is not necessary unless you are building with weird things disabled and you want the SVGs to get converted to nice, compatible PNG files instead.


License
-------
Licensing!

First off, let's get the things you can't use out of the way.

You **may not** use the RiM logo, or any images in this repository in anything other than this Roleplaying is Magic website / rule sets.

You **may not** use the RiM rules themselves, or the writing/copy in this repository in anything other than this Roleplaying is Magic website / rule sets.

Sorry about that. I didn't write these rules or draw the images, and it would be not very nice of me to apply my own open licensing terms to them.

**Please note:** If you would like to be able to use the writing/images for anything else, please feel free to `email me at daniel@danieloaks.net <mailto:daniel@danieloaks.net>`_. I'm open to suggestions, questions, requests, all that fun stuff. This blanket disallowal is just so people don't rip off the images / rules and all because I threw them on Github.

Any code in this repository – ie Javascript, SASS, CSS, Python, stuff which doesn't include images or writings, is licensed under the following BSD 2-clause license::

    Copyright (c) 2014, Daniel Oaks
    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
