function createOverlay(image) {
    overlay = document.createElement('div')
    overlay.setAttribute('class', 'image-magnify-full-size')
    overlay.setAttribute('aria-hidden', 'true')
    overlay.style.backgroundImage = `url('${image.src}')`
    image.parentElement.insertBefore(overlay, image)
    return overlay
}
function moveWithHover(image, event, zoomRatio) {
    const ratio = image.height / image.width
    const container = event.target.getBoundingClientRect()
    const xPosition = event.clientX - container.left
    const yPosition = event.clientY - container.top
    const xPercent = `${xPosition / (overlay.clientWidth / 100)}%`
    const yPercent = `${yPosition / ((overlay.clientWidth * ratio) / 100)}%`
    overlay.style.backgroundPosition = `${xPercent} ${yPercent}`
    overlay.style.backgroundSize = `${image.width * zoomRatio}px`
}
function magnify(image, zoomRatio) {
    const overlay2 = createOverlay(image)
    overlay2.onclick = () => overlay2.remove()
    overlay2.onmousemove = (event) => moveWithHover(image, event, zoomRatio)
    overlay2.onmouseleave = () => overlay2.remove()
}
function enableZoomOnHover(zoomRatio) {
    const images = document.querySelectorAll('.image-magnify-hover')
    images.forEach((image) => {
        image.onclick = (event) => {
            magnify(image, zoomRatio)
            moveWithHover(image, event, zoomRatio)
        }
    })
}
enableZoomOnHover(2)
