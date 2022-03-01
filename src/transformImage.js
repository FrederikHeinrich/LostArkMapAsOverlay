function replaceImage(image) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.height = image.height;
    canvas.width = image.width;

    ctx.drawImage(image, 0, 0);

    var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height),
        pix = imgd.data,
        newColor = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        };

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var r = pix[i],
            g = pix[i + 1],
            b = pix[i + 2];
        var oldR = 32,
            oldG = 37,
            oldB = 40;
        var difR = 11,
            difG = 11,
            difB = 11;
        //if (r == 32 && g == 37 && b == 40) {
        if (r < oldR + difR && r > oldR - difR && g < oldG + difG && g > oldG - difG && b < oldB + difB && b >
            oldB - difB) {
            pix[i + 2] = newColor.b;
            pix[i + 3] = newColor.a;
        }
    }
    ctx.putImageData(imgd, 0, 0);
    image.src = canvas.toDataURL()
    canvas.remove();
}
setInterval(() => {
    var images = document.getElementsByClassName('leaflet-tile');

    Array.prototype.forEach.call(images, function (image) {
        if (image.src.startsWith('https://lostarkmap.com/maps/areas/')) {
            console.log('replaceing Image: ' + image.name)
            replaceImage(image);
        }
    });

    var toremoveGBLight = document.getElementsByClassName('bg-light');
    Array.prototype.forEach.call(toremoveGBLight, function (ele) {
        ele.classList.remove('bg-light');
    });

}, 1000);

document.body.style.backgroundColor = 'transparent';

window.onblur = function () {
    console.log('blur')
    var elelist = document.getElementsByClassName('leaflet-top');
    Array.prototype.forEach.call(elelist, function (ele) {
        ele.classList.add('hide');
    });
    elelist = document.getElementsByClassName('navbar');
    Array.prototype.forEach.call(elelist, function (ele) {
        ele.classList.add('hide');
    });
}
window.onfocus = function () {
    console.log('focus')
    var elelist = document.getElementsByClassName('leaflet-top');
    Array.prototype.forEach.call(elelist, function (ele) {
        ele.classList.remove('hide');
    });
    elelist = document.getElementsByClassName('navbar');
    Array.prototype.forEach.call(elelist, function (ele) {
        ele.classList.remove('hide');
    });

}