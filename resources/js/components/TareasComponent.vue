<template>
  <div>

<!-- boton para agregar notas con modal de boostrap -->
    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal">
  Agregar
</button><br>

<!-- div donde implemento el buscador  -->
<div class="input-group">
<input id="filtrar" type="text" class="form-control" placeholder="buscar">
</div> <br>

<!-- plantilla de la funcion modal de boostrap -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-dismiss="modal" >
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar Nota</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


<!-- inicio de formularios agregar y editar -->
    <form @submit.prevent="editarNota(nota)" v-if="modoEditar">
      <h3>Editar nota</h3>
      <input type="text" class="form-control mb-2" 
        placeholder="Nombre de la nota" v-model="nota.nombre">
      <input type="text" class="form-control mb-2" 
        placeholder="Descripción de la nota" v-model="nota.descripcion">
      <button class="btn btn-success" type="submit">Editar</button>
      <button class="btn btn-danger" type="submit" 
        @click="cancelarEdicion">Cancelar</button>
    </form>
    <form @submit.prevent="agregar" v-else>
      <h3>Agregar nota</h3>
      <input type="text" class="form-control mb-2" 
      placeholder="Nombre de la nota" v-model="nota.nombre">
      <input type="text" class="form-control mb-2" 
      placeholder="Descripción de la nota" v-model="nota.descripcion">
      <button class="btn btn-primary btn-block" type="submit"   >Agregar</button>
    </form>

<!-- fin de formularios  -->
<!-- compleneto de modal  -->
     </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
    </div>
  </div>
</div>
<!-- /////////////////////////////////////////////////// -->
<!-- componente de la tabla en donde retormanos las notas existentes en la BD -->
<h5>Notas existentes:</h5>
    <table class="table" >
  <thead>
    <tr>
      <th scope="col">#Id</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody class="buscar" v-for="(item, index) in notas" :key="index">
  
    <tr>
      <th >{{item.id}}</th>
      <td> {{item.nombre}}</td>
      
      <td>{{item.descripcion}}</td>
      <td>
      <!-- botones etiqueta para editar las notas revisar el id de modal para que coinciada c -->
    
      <button class="btn btn-warning btn-sm" 
        @click="editarFormulario(item)" data-toggle="modal" data-target="#exampleModal">Editar</button>
      <button class="btn btn-danger btn-sm" 
        @click="eliminarNota(item, index)">Eliminar</button>
   
      </td>
    </tr>
  
 
  </tbody>
</table>
  
<!-- ///////////////////////////////////////// -->
    <hr> 
    <!-- lista de notas de esta forma mandamos a llamar los datos pero con lista  -->
    <!-- <ul class="list-group">
         <li class="list-group-item" 
            v-for="(item, index) in notas" :key="index">
          <span class="badge badge-primary float-right">
            {{item.updated_at}}
          </span>
          <p>{{item.nombre}}</p>
          <p>{{item.descripcion}}</p>
          <p>
            <button class="btn btn-warning btn-sm" 
                @click="editarFormulario(item)" data-toggle="modal" data-target="#exampleModal">Editar</button>
            <button class="btn btn-danger btn-sm" 
                @click="eliminarNota(item, index)">Eliminar</button>
          </p>
        </li>
        
    </ul> -->
   
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      notas: [],
      modoEditar: false,
      nota: {nombre: '', descripcion: ''}
    }
  },
  created(){
    axios.get('/notas').then(res=>{
      //  console.log(res.data);
      this.notas = res.data;
    })
  },
  methods:{
    agregar(){
      if(this.nota.nombre.trim() === '' || this.nota.descripcion.trim() === ''){
        alert('Debes completar todos los campos antes de guardar');
        return;
      }
      const notaNueva = this.nota;
      this.nota = {nombre: '', descripcion: ''};    
      axios.post('/notas', notaNueva)
        .then((res) =>{
          const notaServidor = res.data;
          this.notas.push(notaServidor);
        })
    },
    editarFormulario(item){
      this.nota.nombre = item.nombre;
      this.nota.descripcion = item.descripcion;
      this.nota.id = item.id;
      this.modoEditar = true;
    },
    editarNota(nota){
      const params = {nombre: nota.nombre, descripcion: nota.descripcion};
      axios.put(`/notas/${nota.id}`, params)
        .then(res=>{
          this.modoEditar = false;
          const index = this.notas.findIndex(item => item.id === nota.id);
          this.notas[index] = res.data;
          this.nota={nombre: '', descripcion: ''}

           axios.get('/notas').then(res=>{
             this.notas = res.data;
    })
        })
    },
    eliminarNota(nota, index){
      const confirmacion = confirm(`Eliminar nota ${nota.nombre}`);
      if(confirmacion){
        axios.delete(`/notas/${nota.id}`)
          .then(()=>{
            this.notas.splice(index, 1);
          })
      }
    },
    cancelarEdicion(){
      this.modoEditar = false;
      this.nota = {nombre: '', descripcion: ''};
    }
  }
}


</script>

