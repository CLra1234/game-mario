var img=""
var status=""

var objects=[]
function preload(){
    img=loadImage("dog_cat.jpg")
}
function setup(){
    canvas=createCanvas(380,380)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    video.size(380,380)
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="status: detectando objetos"
}
 function modelLoaded(){
    console.log("modelo carregado")
    status=true
    objectDetector.detect(video,gotResult)
 }

 function gotResult(error,results){
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects=results
}

function draw(){
    image(video,0,0,380,380)
    if (status!="") {
        objectDetector.detect(video,gotResult)
        r=random(255)
        g=random(255)
        b=random(255)
        
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status: objeto detectado"
            document.getElementById("numberOfObjects").innerHTML="quantidade de objetos detectados "+objects.length
            fill(r,g,b)
            var percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+ percent+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            
        }
    }
   

}
