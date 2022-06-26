const express = require('express')

const app = express()
const port = 8000

app.set('view engine', 'hbs') // set view engine hbs

app.use('/assets', express.static(__dirname + '/assets')) 
app.use(express.urlencoded({extended: false}))

const projects = []; // array object

app.get('/', function(request, response){
//console.log(projects);

const newProject = projects.map((project) => {
    return {
        ...project
    }
});

response.render('index', {projects, newProject });

})

app.get('/index', function(request, response) {
    response.render('index')
})

app.get('/contact', function(request, response){
    response.render('contact')
})


app.get('/project', function(request, response) {
    response.render('project')
})

app.post('/project', function(request, response){
    
//durasi
    let startM = new Date (request.body.strdate).getMonth();
       let endM = new Date (request.body.enddate).getMonth()
       let startY = new Date (request.body.strdate).getFullYear();
       let endY= new Date (request.body.enddate).getFullYear();
       let selisihHasil = (startM+12*endY)-(endM+12*startY);
       let hasilFinish = Math.abs(selisihHasil);
//date convert
const projectDate = {
    strdate: request.body.strdate,
    enddate: request.body.enddate
}
//object
let dataProject = request.body;
    dataProject = {

    pname : request.body.pname,
    description : request.body.description,
    node : request.body.node,
    vue : request.body.vue,
    react : request.body.react,
    bootstrap : request.body.bootstrap,
    img: dataProject.inputImage,
    durasi: hasilFinish

    }
    projects.push(dataProject)
//    console.log(dataProject);
     response.redirect('/')
})

app.get('/detail-project/:index', function(request, response){

    let index = request.params.index
    // console.log(index);

    let blog = projects[index]

    // console.log(blog);

    response.render('detail-project',blog)
})

app.get('/delete-project/:index', function(request, response){
    // console.log(request.params.index);
    let index = request.params.index
    projects.splice(index, 1)

    response.redirect('/')
})

app.get('/update/:index', function(request, response){
    // console.log(request.params.index);
    let index = request.params.index;
    let update = projects[index];

    // console.log(edit);
    response.render('update', {index, update, projects})
})

app.post('/update/:index', function(request, response){
    //durasi
    let startM = new Date (request.body.strdate).getMonth();
       let endM = new Date (request.body.enddate).getMonth()
       let startY = new Date (request.body.strdate).getFullYear();
       let endY= new Date (request.body.enddate).getFullYear();
       let selisihHasil = (startM+12*endY)-(endM+12*startY);
       let hasilFinish = Math.abs(selisihHasil);
//date convert
const projectDate = {
    strdate: request.body.strdate,
    enddate: request.body.enddate
}

let projectName = request.body.pname;
let description = request.body.description;
let node = request.body.node;
let vue = request.body.vue;
let react = request.body.react;
let bootstrap = request.body.bootstrap;
let img = request.body.inputImage
//object
let  dataProjectU = {

    projectName,
    projectDate,
    description,
    node,
    bootstrap,
    vue,
    react,
    img,
    durasi: hasilFinish

    }

    let index = request.params.index;

    projects[index] = {
        ...projects[index],
        ...dataProjectU
    };

console.log(dataProjectU);
response.redirect('/');
})

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})