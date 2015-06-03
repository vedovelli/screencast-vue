Vue.component('ved-form-endereco', {
    template: '<div class="row"> <div class="col-md-3"> <div class="form-group"> <label for="inputCep">CEP</label> <input type="text" class="form-control" id="inputCep" v-el="cep" v-model="cep" v-on="keyup:buscar"> </div></div><div class="col-md-9"></div></div><p class="text-danger" style="display:none;" v-show="naoLocalizado"><strong>Endereço não localizado</strong>. Por gentileza entre manualmente!</p><div class="row"> <div class="col-md-5"> <div class="form-group"> <label for="inputLogradouro">Logradouro</label> <input type="text" class="form-control" id="inputLogradouro" v-model="endereco.logradouro" v-el="logradouro"> </div></div><div class="col-md-2"> <div class="form-group"> <label for="inputNumero">Numero</label> <input type="text" class="form-control" id="inputNumero" v-el="numero"> </div></div><div class="col-md-5"> <div class="form-group"> <label for="inputComplemento">Complemento</label> <input type="text" class="form-control" id="inputComplemento"> </div></div></div><div class="row"> <div class="col-md-5"> <div class="form-group"> <label for="inputBairro">Bairro</label> <input type="text" class="form-control" id="inputBairro" v-model="endereco.bairro"> </div></div><div class="col-md-5"> <div class="form-group"> <label for="inputCidade">Cidade</label> <input type="text" class="form-control" id="inputCidade" v-model="endereco.localidade"> </div></div><div class="col-md-2"> <div class="form-group"> <label for="inputEstado">Estado</label> <input type="text" class="form-control" id="inputEstado" v-model="endereco.uf"> </div></div></div>',
    data: function()
    {
        return {
            cep:'',
            endereco: {},
            naoLocalizado: false
        }
    },
    attached: function()
    {
        jQuery(this.$$.cep).mask('00000-000');
    },
    methods: {
        buscar: function()
        {
            var self = this;

            self.endereco = {};
            naoLocalizado = false;

            if(/^[0-9]{5}-[0-9]{3}$/.test(this.cep))
            {
                jQuery.getJSON('http://viacep.com.br/ws/'+this.cep+'/json/', function(endereco)
                {
                    if(endereco.erro)
                    {
                        jQuery(self.$$.logradouro).focus();
                        self.naoLocalizado = true;
                        return;
                    }
                    self.endereco = endereco;
                    jQuery(self.$$.numero).focus();
                });
            }
        }
    }
});