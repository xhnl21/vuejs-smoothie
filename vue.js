    const app = new Vue({
      el: '#app',
      data:{
        sn:'',
		fruit:'',
		liquid:'',
		protein:'',
		taste:'',
		sumP:'',
		fn:'',
		fnn:'',
		smoot:[], 
		selectT:[], 
		selectP:[],
		selectF:[], 
		selectL:[],     
      },
      methods:{
        createSmoothie: function(){
          //valida el campo 
			if(this.sn === ''){
				alert('El campo esta vacio, Por Favor Ingrese un valor.');
			}else{
				let p = this.selecProteina(this.protein);
				let f = this.selecFruta(this.fruit);   
				let l = this.selecLiquido(this.liquid);
				var s = (parseInt(l[0].l) + parseInt(f[0].p)); 
				this.smoot.push({
					sn: this.sn,
					fruit: f[0].fruta,
					liquid: l[0].liquido,
					protein: p[0].proteina,
					sum: s,
					taste: this.taste,
					status: true,
				});

				localStorage.setItem('furion', JSON.stringify(this.smoot));
			}
        },

        createFruit: function(){
          //valida el campo 
			if(this.fn === ''){
				alert('El campo esta vacio, Por Favor Ingrese un valor.');
			}else{
				let f = this.selectF;
				let count = f.length;  
				var s = (parseInt(count) + parseInt(1)); 
				this.selectF.push({
					id: s,
					fruta: this.fn,
					p: this.fnn,
				});
	            localStorage.setItem('furionF', JSON.stringify(this.selectF));	
				let datosBD = JSON.parse(localStorage.getItem('furionF'));
	            this.selectF = datosBD;  			
			}
        },        

        edit: function(id){
          let status = '';
          status = this.smoot[id].estado;
          if(status === false){
            this.smoot[id].estado = true;
          }else{
            this.smoot[id].estado = false;
          }    
          localStorage.setItem('furion', JSON.stringify(this.smoot));      
        },

        trash: function(id){
          this.smoot.splice(id,1);
          localStorage.setItem('furion', JSON.stringify(this.smoot));
        }, 

        listar: function(){
          //////////////////////////
          //// Listar localStorage ////
          let datosBD = JSON.parse(localStorage.getItem('furion'));
          if(datosBD === null){
            this.smoot = [];     
          }else{
            this.smoot = datosBD;
          } 
        }, 

        selecTaste: function(){
        	var data = [];
            var p = 100;
            for(var i = 1; i <= p; i++){
              data.push({i:i});
            }            
            this.selectT = data; 
        }, 

        selecProteina: function(id){
        	if(id === "" || id === null || id === undefined){    
	        	var data = [
		        	{"id":"1","proteina":"Vainilla"},
		        	{"id":"2","proteina":"Chocolate"},
		        	{"id":"3","proteina":"Coco"},
		        	{"id":"4","proteina":"Caramelo"},
		        	{"id":"5","proteina":"Sin sabor"}
	        	];     
	            this.selectP = data; 
        	}else{
        		var res = [];
				let selectP = this.selectP;
	            for (var i = 1; i < selectP.length; i++) {
	            	if(id === selectP[i].id){
	            		res.push({"id":selectP[i].id,"proteina":selectP[i].proteina});
	            	}
	            }
	            return res;
        	}
        },
        selecFruta: function(id){
        	if(id === "" || id === null || id === undefined){        	  
					let datosBD = JSON.parse(localStorage.getItem('furionF'));
					if(datosBD === null){
			        	var data = [
				        	{"id":"1","fruta":"Watermelon","p":6},
				        	{"id":"2","fruta":"Strawberry","p":5},
				        	{"id":"3","fruta":"Pineapple","p":8},
				        	{"id":"4","fruta":"Oranje","p":10},
				        	{"id":"5","fruta":"Kiwi","p":7},
				        	{"id":"6","fruta":"Banana","p":9},
				        	{"id":"7","fruta":"Limes","p":4},
			        	];     
	            		this.selectF = data;						
						localStorage.setItem('furionF', JSON.stringify(this.selectF)); 
					}else{
						let datosBD = JSON.parse(localStorage.getItem('furionF'));
						this.selectF = datosBD;  	
					}									        
        	}else{
        		var res = [];
				let selectF = this.selectF;
	            for (var i = 0; i < selectF.length; i++) {
	            	if(id === selectF[i].id){
	              		res.push({"id":selectF[i].id,"fruta":selectF[i].fruta,"p":selectF[i].p});
	              	}
	            }
	            return res;
        	}            
        }, 
        selecLiquido: function(id){
        	if(id === "" || id === null || id === undefined){                	
	        	var data = [
		        	{"id":"1","liquido":"Leche","l":4},
		        	{"id":"2","liquido":"Agua","l":0},
		        	{"id":"3","liquido":"Agua de coco","l":2},
		        	{"id":"4","liquido":"Leche de soya","l":3},
		        	{"id":"5","liquido":"Leche de almendra","l":1},
	        	];     
	            this.selectL = data; 
        	}else{
        		var res = [];
				let selectL = this.selectL;
	            for (var i = 0; i < selectL.length; i++) {
	            	if(id === selectL[i].id){
	              		res.push({"id":selectL[i].id,"liquido":selectL[i].liquido,"l":selectL[i].l});
	              	}
	            }
	            return res;
        	}             
        },                         
      },
      created: function(){
        this.listar(); 
        this.selecTaste();
        this.selecProteina();
        this.selecFruta();
        this.selecLiquido();
      },
    })


	$(document).ready(function(){
		// $('#liquid').select2();
		// $('#protein').select2();
		// $('#taste').select2();
		// $('#fruit').select2();

		$('.take').hide(); //oculto mediante id
		$('.create').hide(); //muestro mediante clase	
		$('.createFp').hide(); //muestro mediante clase		
		$("#create").on( "click", function() {
			$('.create').slideDown(); //muestro mediante id
			$('.take').hide(); //oculto mediante id
			$('.back').hide(); //muestro mediante clase
			$('.createFp').hide(); //muestro mediante clase		
		});
		$("#take").on( "click", function() {
			$('.take').slideDown(); //muestro mediante id
			$('.create').hide(); //oculto mediante id
			$('.back').hide(); //muestro mediante clase
			$('.createFp').hide(); //muestro mediante clase		
		});
		$("#back").on( "click", function() {
			$('.back').slideDown(); //muestro mediante id
			$('.create').hide(); //oculto mediante id
			$('.take').hide(); //muestro mediante clase
			$('.createFp').hide(); //muestro mediante clase		
		});	
		$("#backx").on( "click", function() {
			$('.back').slideDown(); //muestro mediante id
			$('.create').hide(); //oculto mediante id
			$('.take').hide(); //muestro mediante clase
			$('.createFp').hide(); //muestro mediante clase		
		});	
		$("#backz").on( "click", function() {
			$('.back').slideDown(); //muestro mediante id
			$('.create').hide(); //oculto mediante id
			$('.take').hide(); //muestro mediante clase
			$('.createFp').hide(); //muestro mediante clase		
		});			
		$("#createFp").on( "click", function() {
			$('.createFp').slideDown(); //muestro mediante id
			$('.create').hide(); //oculto mediante id
			$('.take').hide(); //muestro mediante clase
			$('.create').hide(); //muestro mediante clase		
		});						
	});