const imageArr = [ 
    '/assets/earth.png', 
    '/assets/moon1.jpeg',
    '/assets/moon2.jpeg',
    '/assets/space1.jpeg',
    '/assets/space2.jpeg',
    '/assets/space3.jpeg',
    '/assets/space4.jpeg',
    '/assets/space5.jpeg',
    '/assets/space6.jpg',
    '/assets/sun1.jpeg',
    '/assets/rocket.png',
];
function init() {
    let closeImageContainer = document.getElementById('close-image-container');
    let rightImageContainer = document.getElementById('right-arrow-btn');
    let leftImageContainer = document.getElementById('left-arrow-btn');
    for (let i = 0 ; i < imageArr.length ; i++) {
        createImageWithContainer(imageArr[i], i);
    }
    closeImageContainer.addEventListener('click', closeBigImage);
    rightImageContainer.addEventListener('click', nextImage);
    leftImageContainer.addEventListener('click', previousImage);
}

document.addEventListener('DOMContentLoaded', init);

function createImageWithContainer(path, i) {
    let imageBoardContainer = document.getElementById('image-board-container');
    let imageContainer = document.createElement('div');
    let image = document.createElement('img');
    imageContainer.classList.add('image-container');
    imageContainer.addEventListener('click', openBigImage)
    image.src = path;
    image.id = 'image-' + i;
    imageContainer.appendChild(image);
    imageBoardContainer.appendChild(imageContainer);
}

function openBigImage(e) {
    let imageSliderWrapper = document.getElementById('image-slider-wrapper');
    createBigImage(event.currentTarget.children[0]);
    imageSliderWrapper.style.width = '100vw';
    imageSliderWrapper.style.height = '100vh';
    imageSliderWrapper.style.opacity = '1';
    document.body.classList.add('no-scroll');
}

function createBigImage(child) {
    if (child) {
        let imageBoardContainer = document.getElementById('image-slider-container');
        if (imageBoardContainer) {
            while (imageBoardContainer.hasChildNodes()) {  
                imageBoardContainer.removeChild(imageBoardContainer.firstChild);
            }
            let image = document.createElement('img');
            image.src = child.src;
            image.classList.add('big_image');
            image.id = 'big_' + child.id;
            setTimeout(function() {
                image.style.opacity = 1;
            },250);
            imageBoardContainer.append(image);
        }
    }
}

function closeBigImage() {
    let imageSliderWrapper = document.getElementById('image-slider-wrapper');
    imageSliderWrapper.style.opacity = '0';
    setTimeout(function() {
        imageSliderWrapper.style.width = '0';
        imageSliderWrapper.style.height = '0';
    }, 700); // Diese Zeit muss mit der Zeit im CSS übereinstimmen

    document.body.classList.remove('no-scroll');
}

function nextImage() {
    let bigImagePos = getBigImage();
    const bigImage = document.getElementById('big_image-' + bigImagePos);
    bigImage.style.opacity = 0;
    setTimeout(function() {
    if (parseFloat(bigImagePos) < imageArr.length -1) {
        bigImagePos = parseFloat(bigImagePos) + 1;
    } else {
        bigImagePos = 0;
    }
    const sliderContainer = document.getElementById("image-slider-container");
    sliderContainer.innerHTML = '';
    const image = document.getElementById('image-' + bigImagePos);

        createBigImage(image);
    },250);
}

function previousImage() {    
    let bigImagePos = getBigImage();
    const bigImage = document.getElementById('big_image-' + bigImagePos);
    bigImage.style.opacity = 0;
    setTimeout(function() {
        if (parseFloat(bigImagePos) > 0) {
            bigImagePos = parseFloat(bigImagePos) - 1;
        } else {
            bigImagePos = imageArr.length - 1;
        }
        const sliderContainer = document.getElementById("image-slider-container");
        sliderContainer.innerHTML = '';
        createBigImage(document.getElementById('image-' + bigImagePos));
    },250);
}

function getBigImage() {
    let bigImage = document.getElementById('image-slider-container').children[0];
    let id = bigImage.id;
    return id.substring(id.toString().search('-') + 1, id.length);

}