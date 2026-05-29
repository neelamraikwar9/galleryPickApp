# GalleryPick

This app is similar to the Google Photos app. Users can create, share, view, and delete albums; upload and edit images; add comments to images; and favorite images.                                                                                                                                                                                                              
Build with React Frontend, Expess/Node backend, MongoDB database, Express and React Router.


---


## Demo Link 

[Live Demo](https://gallery-pick-app.vercel.app/signin)


--- 


## Quick Start

```

git clone https://github.com/neelamraikwar9/galleryPickApp.git  
cd <galleryPickApp>
npm install
npm run dev

```


---


## Technologies

- React JS 
- React Router
- Node JS
- Express
- MongoDB
- react-toastify
- axios
- bootstrap-icons
- CSS


--- 


## Demo Video

Watch a Walkthrough 
[Video]()  


---


## Features 

**Home**

 - Display all user's Image with Detail.
 - All image includes a button to edit the image info and two more buttons, one to delete and another one to add comments on the images.
 

 **Add Images**

 - A form to upload images.


 **Favorites**

 - Display all favorite images with a filled heart.


 **Create Album**

 - A form to create albums. 


 **Albums**

 - Display all albums with the Share, View and Delete buttons.
 

 **Shared Albums**

 - Shows shared albums if shared by another user otherwise shows a message "No albums have shared yet."



 ---


 ## API Refrence

 ### GET /[api/images](https://gallery-pick-apis-lfxz.vercel.app/images)<br/>

 List of all Images <br/>  

 Sample Response: <br/>
 
 ```

[{ _id, imgUrl, imageId, albumId, name, tags, ownerId, person, isFavorite, comments, size, uploadedAt }, ....] 


 ```


 ### GET /[api/favorites](https://gallery-pick-apis-lfxz.vercel.app/images/favorites)<br/>

 List of  favorite images <br/>  

 Sample Response: <br/>
 
 ```

[{ _id, imgUrl, imageId, albumId...}, ] 


 ```


 ## Contact
 For bugs or feature request, please reach out to neelam.raikwar.234303@gmail.com


