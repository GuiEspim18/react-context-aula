import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useShopping } from 'common/contexts/Shopping/Shopping';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  // pegando as propriedades do hook que nós criamos
  const { shopping, addProduct, removeProduct } = useShopping();

  // achando o produto que está relacionado ao id passado como prop pelo component
  const product = shopping.find(element => element.id === id)

  return (
    <Container>
      <div>
        <img
          src={`/assets/${foto}.png`}
          alt={`foto de ${nome}`}
        />
        <p>
          {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton
          color="secondary"
          onClick={() => removeProduct(id)}
          disabled={!product}
        >
          <RemoveIcon />
        </IconButton>
        {/* contator de quantidade */}
        {product?.quantity || 0}
        <IconButton color="primary" onClick={() => addProduct({nome, foto, id, valor})}>
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  )
}

export default memo(Produto)