from fastapi import APIRouter, Depends, HTTPException, status

from app.persistence.tarefa_mongodb_repository import TarefaMongoDBRepository

from ..viewmodels import Tarefa, UsuarioSimples

print('Tarefa Controller ✅')
routes = APIRouter()
prefix = '/tarefas'

# Banco de Dados
tarefas_repository = TarefaMongoDBRepository()

@routes.get('/')
def todas_tarefas(skip: int | None = 0, take: int | None = 0):
    return tarefas_repository.todos(skip, take)


@routes.get('/{tarefas_id}')
def obter_tarefas(tarefa_id: int | str):
    tarefas = tarefas_repository.obter_um(tarefa_id)

   # fall fast
    if not tarefas:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                          detail=f'Não há tarefa com id = {tarefa_id}')

    return tarefas


@routes.post('/', status_code=status.HTTTP_201_CREATED)
def nova_tarefa(tarefa: Tarefa):
     return tarefas_repository.salvar(tarefa)


@routes.delete("/{tarefa_id}", status_code=status.HTTP_204_NO_CONTENT)
def remover_tarefa(tarefa_id: int | str):
     tarefa = tarefas_repository.obter_um(tarefa_id)

     if not tarefa:
          raise HTTPException(status.HTTP_404_NOT_FOUND,
                              detail="Tarefa não encontrada")
     
     tarefas_repository.remover(tarefa_id)


@routes.put('/{tarefa_id}')
def atualizar_tarefa(tarefa_id: int | str, tarefa: Tarefa):
     tarefa_encontrada = tarefas_repository.obter_um(tarefa_id)

     if not tarefa_encontrada:
          raise HTTPException(status.HTTP_404_NOT_FOUND,
                              detail="Tarefa não encontrada")
     
     return tarefas_repository.atualizar(tarefa_id, tarefa)