# Wordpress-Build

## Steps for getting Wordpress where it needs to be via the Terminal
1. Traverse to the site folder within the projects directory 
`cd PROJECT-ROOT/public/site`
2. Download the Wordpress files
`curl -OL http://wordpress.org/latest.tar.gz`
3. Unpack the files
`tar xfz latest.tar.gz`
4. Move the files to the root
`mv wordpress/* .`
5. Remove the leftovers
`rm latest.tar.gz && rm -rf wordpress`
