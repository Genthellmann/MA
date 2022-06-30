
function helper_pos(category, prob){

    const radius = 90;

    //distance from Boarder should be at least Radius of smallest trend which is 45/12
    //Inner circle: probability "high"
    const R0 = radius/12;
    const R1 = radius/3-radius/12;

    //Middle circle: probability "medium"
    const R2 = radius/3+radius/12
    const R3 = 2*radius/3-radius/12;

    //Outer Circle: probability "low"
    const R4 = 2*radius/3+radius/12
    const R5 = radius-radius/12;

    let theta = 0;
    let dist = 0;

    if (category === "user"){
        theta = (2/3)*Math.PI*Math.random() + Math.PI/6;

    }
    //category Market Environment
    if (category === "technology"){
        theta = (2/3)*Math.PI*Math.random() + (5/6)*Math.PI;


    }
    //category technology
    if (category === "menv"){
        theta = (2/3)*Math.PI*Math.random() + (3/2)*Math.PI;


    }

    // if (category === "user"){
    //     theta = (2/3)*Math.PI*Math.random();
    //     console.log("theta_helper:" + theta);
    //     console.log("category_helper: " + category + " if user")
    // }
    // //category Market Environment
    // if (category === "menv"){
    //     theta = (2/3)*Math.PI*Math.random() + (2/3)*Math.PI;
    //     console.log("theta_helper:" + theta);
    //     console.log("category_helper: " + category + " if menv")
    //
    // }
    // //category technology
    // if (category === "technology"){
    //     theta = (2/3)*Math.PI*Math.random() + (4/3)*Math.PI;
    //     console.log("theta_helper:" + theta);
    //     console.log("category_helper: " + category + " if technology")
    //
    // }

    if(prob === "high"){
        dist = Math.sqrt(Math.random()*(R0**2-R1**2)+R1**2);
    }

    if(prob === "medium"){
        dist = Math.sqrt(Math.random()*(R2**2-R3**2)+R3**2);
    }

    if(prob === "low"){
        dist = Math.sqrt(Math.random()*(R4**2-R5**2)+R5**2);
    }



    const x = dist * Math.cos(theta);
    const y = dist * Math.sin(theta);


    return ([x,y]);


    // TODO
//    check whether there is already a point
    // Radius from Frontend
}
module.exports = helper_pos;

