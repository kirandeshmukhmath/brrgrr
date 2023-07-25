const spinnerwrapper = document.querySelector('.spinner-wrapper');

window.addEventListener('load', () => {
    spinnerwrapper.style.display = '0'

    setTimeout(() => {
        spinnerwrapper.style.display = 'none';
    }, 1500)
});