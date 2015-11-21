Photo Portfolio
===================
![photoportfolio](https://cloud.githubusercontent.com/assets/6794845/11320307/a0e49056-9062-11e5-8509-4f587f391e63.gif)

Node.js based generator for a photo portfolio website.

Inspired by [Expose](https://github.com/Jack000/Expose).

Built using:
- [Freewall](http://vnjs.net/www/project/freewall/)
- [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup)
- [Codrops Multi-Level Menu](http://tympanus.net/codrops/2015/11/17/multi-level-menu/)
- [Handlebars](http://handlebarsjs.com/)

**Prerequisite:** [ImageMagick](http://www.imagemagick.org/script/index.php) must be installed for the creation of thumbnails

How to Use
--------------
- Put all of your .jpg/.JPG photos in the photos directory, sorted into subfolders
- The names of the subfolders will appear in the menu, when naming your subfolders use underscores '_' instead of spaces ' '
- To include a title with the image, add a file with the same name as the photo, but with a .txt file extension, containing the title information for that image
- Generate your index.html file by running `node compile.js`. This will also generate thumbnails for your images
- Copy `index.html` and the folders `css, fonts, img, js, photos, thumbnails` to your server
- Open the index.html file in your web browser and enjoy
