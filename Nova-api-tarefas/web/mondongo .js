                        const baseURL = 'http://127.0.0.1:8000/tarefa'
                        
                        let tarefas = []
                        let editing = false
                        let tarefa_id
                        
                        //limpar o enviar formulário
                        function resetar_formulario() {
                            const form_task = document.getElementById('form-task')
                            form_task.reset()
                        
                            const btn_confirmar = document.getElementById('btn-confirmar')
                            btn_confirmar.value = 'Adicionar Tarefa'
                        
                            editing = false
                        }
                        
                        //atualizar a tela e enviar os dados
                        function atualizar_tela(){
                            // Manipulacao de DOM
                            const ul_tarefas = document.getElementById('list-task')
                            ul_tarefas.innerHTML = []
                        
                            for(let tarefa of tarefas){
                                const item = document.createElement('li')
                                // const label = '#'+tarefa.id+' - '+tarefa.descricao + ' - ' + tarefa.responsavel' - ' + tarefa.nivel ' - ' + tarefa.prioridade ' - ' + tarefa.situacao
                                const label = `#${tarefa.id} - ${tarefa.descricao} -  ${tarefa.responsavel} - ${tarefa.nivel} - ${tarefa.prioridade} - ${tarefa.situacao} `
                        
                                const btn_editar = document.createElement('a') // <a></a>
                                btn_editar.innerText = 'Editar' // <a>Editar</a>
                                btn_editar.href = '#'
                                
                                btn_editar.onclick = (event) => {
                                    event.preventDefault()
                        
                                    // 1. Preencher o Formulário
                                    preencher_formulario(tarefa)
                                    
                                    // 2. Mudar o Label do Botão para Atualizar
                                    const btn_confirmar = document.getElementById('btn-confirmar')
                                    btn_confirmar.value = 'Editar Tarefa'
                        
                                    // 3. Salvar um Estado Global se está editando
                                    editing = true
                                    tarefa_id = tarefa.id
                                }
                        
                                const btn_remover = document.createElement('a') // <a></a>
                                btn_remover.innerText = 'Remover' // <a>Editar</a>
                                btn_remover.href = '#'
                                const espaco = document.createElement('span')
                                espaco.innerText = ' '
                                btn_remover.onclick = async (event) => {
                                    // alert(`Remover o Filme ${filme.nome}!!`)
                                    // chamar API método DELETE passando o ID URL
                                    event.preventDefault()
                                    const confirmou = confirm(`Deseja mesmo remover a tarefa: ${tarefa.nome}`)
                        
                                    if (!confirmou){
                                        return
                                    }
                        
                                    const response = await fetch(baseURL+'/'+tarefa.id, {method: 'DELETE'})
                        
                                    // se deu certo..
                                    if (response.ok){
                                        alert('Tarefa removida com sucesso!')
                                        carregar_tarefas()
                                    }
                                }
                        
                                item.innerText = label
                                item.appendChild(btn_editar)
                                item.appendChild(espaco)
                                item.appendChild(btn_remover)
                        
                                ul_tarefas.appendChild(item)
                            }
                        }
                        
                        function preencher_formulario(tarefa){
                            const form_task = document.getElementById('form-task')
                        
                            const inputs = form_task.children
                            inputs[0].value = tarefa.responsavel
                            inputs[1].value = tarefa.descricao
                            inputs[2].value = tarefa.nivel
                            inputs[3].value = tarefa.prioridade
                            inputs[4].value = tarefa.situacao
                            
                        }
                        
                        async function carregar_tarefas(){
                            console.log('API - Todas tarefas')
                            const response = await fetch(baseURL)
                        
                            const status = response.status
                            tarefas = await response.json()
                        
                            atualizar_tela()
                        
                            // console.log('Status', status)
                            // console.log('Dados', dados)
                        }
                        
                        function configurar_formulario(){
                            const form_task = document.getElementById('form-task')
                            const input_responsavel = document.querySelector('#task-responsavel')
                            const textarea_descri = document.getElementById('task-description')
                            const select_nivel = document.getElementById('task-nivel')
                            const select_prioridade = document.getElementById('task-priority')
                            const select_situacao = document.getElementById('task-situacao')
                        
                            const btn_cancelar = document.getElementById('btn-cancelar')
                        
                            btn_cancelar.onclick = () => {
                                const btn_confirmar = document.getElementById('btn-confirmar')
                                btn_confirmar.value = 'Adicionar Tarefa'
                            }
                        
                            form_task.onsubmit = async function(event){
                        
                                event.preventDefault()
                        
                                const dados = form_task.children
                                const responsavel = input_responsavel.value
                                const descricao = textarea_descri.value
                                const nivel = select_nivel.value
                                const prioridade = select_prioridade.value
                                const situacao = select_situacao.value
                        
                                const tarefa = {responsavel, descricao, nivel, prioridade, situacao}
                        
                                console.log('Submeteu!!!')
                                console.log(tarefa)
                                // console.log('Tarefa: ', tarefa)
                                let url = baseURL
                                let method = 'POST'
                                let mensagem_ok = 'Tarefa Adicionado com sucesso!'
                                let mensagem_erro = 'Não foi possível adicionar'
                                let response_status = 201
                        
                                if (editing){
                                    url = baseURL+'/'+tarefa_id
                                    method = 'PUT'
                                    mensagem_ok = 'Filme Atualizado com sucesso!'
                                    mensagem_erro = 'Não foi possível editar'
                                    response_status = 200
                                }
                        
                                const opcoes = {
                                    method: method, 
                                    body: JSON.stringify(tarefa),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                        
                                const response = await fetch(url, opcoes)
                            
                                if (response.status === response_status ){
                                    alert(mensagem_ok)
                                    carregar_tarefas()
                                    resetar_formulario()
                                }else{
                                    alert(mensagem_erro)
                                }
                                
                            }
                        }
                        
                        
                        function app(){
                            console.log('APP Tarefas')
                            configurar_formulario()
                            carregar_tarefas()
                        }
                        
                        
                        
                        app()
                        
