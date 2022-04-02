


class egg{
    constructor(width,height,id_egg,pos_x,pos_y,speed){
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.id_egg = id_egg;
        this.speed = speed;
    }
}


var box = {
    x:200,
    y:450,
    width:100,
    height:50,
    id_box:"box",
    speed: 15,
    draw_x(){
        document.getElementById(this.id_box).style.left = this.x+"px";
    },
    draw_y(){
        document.getElementById(this.id_box).style.left = this.y+"px";
    }
};


var point={
    count_points: 0 ,
    id_points:"points",
    draw_points(){
        document.getElementById(this.id_points).innerHTML=this.count_points;
    }
};


const pause=()=>{
    document.getElementById("body").className="body_color";
    alert("Press button ok to continue");
    document.getElementById("body").className="";
}


var timeMinut = 10;

const timer=()=>{
    timerShow = document.getElementById("timer");
    timeMinut++;
    t = setInterval(() => {
        if (timeMinut <= 0) {
            clearInterval(t);
        } else { 
            --timeMinut;
            let strTimer = `${Math.trunc(timeMinut/60%60)}:${timeMinut%60 }`;
            
            timerShow.innerHTML = strTimer;
        }
    }, 1000)
}

const create_tag=(n_egg)=>{
    let game_field = document.getElementById("game_field");

    for(let i=0;i<n_egg;++i){
        div_egg = document.createElement("div");
        div_egg.setAttribute("id","egg"+i.toString());
        div_egg.setAttribute("class","egg_img pos_egg");
        game_field.appendChild(div_egg);
    }
    
    div_box = document.createElement("div");
    div_box.setAttribute("id","box");
    div_box.setAttribute("class","box_img");
    game_field.appendChild(div_box);
    
}

const move_and_check =(row_egg,name)=>{
    game = setInterval(()=> {  
        for(let i in row_egg){
            document.getElementById(row_egg[i].id_egg).style.left= row_egg[i].pos_x+"px";

            if(row_egg[i].pos_y <= 500){
                row_egg[i].pos_y+=row_egg[i].speed;
                document.getElementById(row_egg[i].id_egg).style.top = row_egg[i].pos_y+"px";
                if(row_egg[i].pos_x>=box.x-30 && row_egg[i].pos_x+row_egg[i].width<=box.x+box.width+30 &&
                    row_egg[i].pos_y+row_egg[i].height-40>=box.y &&  row_egg[i].pos_y<=box.y+box.height){
                    row_egg[i].pos_x = Math.floor(Math.random()*450);
                    row_egg[i].pos_y = 5;
                    row_egg[i].speed = Math.floor(Math.random()*5)+1;
                    ++point.count_points;
                }
    
            }else{
                row_egg[i].pos_x = Math.floor(Math.random()*450);
                row_egg[i].pos_y = 10;
                row_egg[i].speed = Math.floor(Math.random()*2)+1;
            }
            point.draw_points();
        }
        if(timeMinut<=0){

            alert(name+", you scored "+point.count_points+" points");
            document.getElementById("name_person").value = "";
            let parent = document.getElementById("game_field");
            for(let i in row_egg)
                parent.removeChild(document.getElementById("egg"+i.toString()));
            parent.removeChild(document.getElementById("box"));

            document.getElementById("game_field").className = "hide";
            document.getElementById("p_t").className="hide";
            document.getElementById("start_game").className = ""; 
            point.count_points = 0;

            clearInterval(game);
        }   
    },20);
}

const generate_egg=(n_egg)=>{
    var row_egg = new Array();

    create_tag(n_egg);

    for(let i=0;i<n_egg;++i){
        row_egg.push(new egg(50,70,"egg"+i.toString(), Math.floor(Math.random()*450),5,Math.floor(Math.random()*5)+1))
    }
    return row_egg;
}

const main=()=>{

    let name;
    if((name=document.getElementById("name_person").value).toString().trim()==""){
        alert("Enter your name");
    }
    else{
        document.getElementById("start_game").className = "hide"; 
        document.getElementById("game_field").className = "game_field";
        document.getElementById("p_t").className="p_t"; 
        timeMinut=60    ;
        let row_egg=generate_egg(30);
        timer(); 
        move_and_check(row_egg,name);
    }
}



window.addEventListener('keydown',(event)=>{
    if(event.code=='ArrowRight' ){
        if(box.x <= 400) {
            box.x+=box.speed;
            box.draw_x();
        }
    }
    if(event.code=='ArrowLeft'){
        if(box.x>= 20) {
            box.x-=box.speed;
            box.draw_x();
        }
    }
    // if(event.code=='ArrowUp'){
    //     if(box.y >= 20) {
    //         box.y-=box.speed;
    //         box.draw_y();
    //     }
    // }
    // if(event.code=='ArrowDown'){
    //     if(box.y <= 350) {
    //         box.y+=box.speed;
    //         box.draw_y();
    //     }
    // }
    if(event.code=='Escape'){
        pause();
    }
});



