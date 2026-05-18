# Attribution
The project uses the following resources:

* **Solar System Scope:** Texture map resources from [Solar System Scope](https://www.solarsystemscope.com/textures/) 
    * Distributed under [Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/). You may use, adapt, and share these textures for any purpose, even commercially
    * No changes were made to the original content

* **NASA:** Texture map resources from [NASA](https://science.nasa.gov/3d-resources/) 
    * "NASA content – images, audio, video, and media files used in the rendition of 3-dimensional models, such as texture maps and polygon data in any format – generally are not subject to copyright in the United States."
    * More on the guideline can be found at [NASA Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)

**Note:** The texture map file required for this website is not in the repository, please download the texture map files from the website listed above and place it into the correct folders before running the website.

* **VirtualSky:** The sky map functionality of the website uses the [VirtualSky library](https://github.com/slowe/VirtualSky)

* **OpenWeather:** Weather data provided by the [OpenWeatherMap API](https://openweathermap.org/api)

# How to open this website
**Note:** Current code cannot run correctly on localhost at this time due to the changes made to support cPanel website hosting. But I plan to update the code in the future so it can support both localhost and cPanel deployment environments.

* clone this github repository
* cd into the directory 
* Run `npm install`, this will install all the required dependencies 
* Run `npm run dev`, this will launch the website locally. 
