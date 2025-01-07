export function loadOBJFromFile(file, scene) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const objLoader = new THREE.OBJLoader();
        const object = objLoader.parse(event.target.result);
        clearScene(scene);
        scene.add(object);
    };
    reader.readAsText(file);
}

export function loadOBJFromText(objText, scene) {
    const objLoader = new THREE.OBJLoader();
    const object = objLoader.parse(objText);
    clearScene(scene);
    scene.add(object);
}

function clearScene(scene) {
    while (scene.children.length > 2) {
        scene.remove(scene.children[scene.children.length - 1]);
    }
}
