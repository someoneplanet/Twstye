export function loadOBJWithMTL(objPath, mtlPath, scene) {
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(mtlPath, (materials) => {
        materials.preload();

        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load(objPath, (object) => {
            clearScene(scene);
            scene.add(object);
        }, undefined, (error) => {
            console.error('Error loading OBJ file:', error);
        });
    }, undefined, (error) => {
        console.error('Error loading MTL file:', error);
    });
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
