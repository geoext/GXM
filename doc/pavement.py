from paver.easy import *
import paver.doctools
from paver.setuputils import setup

setup(
    name="MyCoolProject",
    packages=['hello'],
    version="1.0",
    url="http://www.terrestris.de/",
    author="terrestris",
    author_email="info@terrestris.de"
)

@task
def parse_docs():
    from jstools.jst import DocParser
    parser = DocParser.from_fn("jst.cfg")
    parser.run()

#@task
#@needs(['html', "distutils.command.sdist"])
#def sdist():
#    """Generate docs and source distribution."""
#    pass

#@task
#@needs(['pavement.parse_docs',
#        'paver.doctools.html'])
#def html(options):
#    """Build the docs and put them into our package."""
#    destdir = path('newway/docs')
#    destdir.rmtree()
#    builtdocs = path("docs") / options.builddir / "html"
#    builtdocs.move(destdir)
