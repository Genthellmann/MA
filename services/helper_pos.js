
function helper_pos(category, prob){
    const R0 = 0;
    const R1 = 20;
    const R2 = 30;
    const R3 = 40;

    let theta = 0;
    let dist = 0;


    if (category === "user"){
        theta = (2/3)*Math.PI*Math.random();
        console.log("theta:" + theta);
    }
    //category Market Environment
    if (category === "menv"){
        theta = (2/3)*Math.PI*Math.random() + (2/3)*Math.PI;
        console.log("theta:" + theta);
    }
    //category technology
    if (category === "technology"){
        theta = (2/3)*Math.PI*Math.random() + (4/3)*Math.PI;
        console.log("theta:" + theta);
    }

    if(prob === "high"){
        dist = Math.sqrt(Math.random()*(R0**2-R1**2)+R1**2);
    }

    if(prob === "medium"){
        dist = Math.sqrt(Math.random()*(R1**2-R2**2)+R2**2);
    }

    if(prob === "low"){
        dist = Math.sqrt(Math.random()*(R2**2-R3**2)+R3**2);
    }



    const x = dist * Math.cos(theta);
    const y = dist * Math.sin(theta);

    return ([x,y]);


    // TODO
//    check whether there is already a point
    // Radius from Frontend
}
module.exports = helper_pos;

