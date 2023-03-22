import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { usePayment } from 'common/contexts/Payment/Payment';
import { useShopping } from 'common/contexts/Shopping/Shopping';
import { UserContext } from 'common/contexts/User/User';
import Produto from 'components/Produto';
import { useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { shopping, totalValue, buy } = useShopping();
  const history = useHistory();
  const { paymentForm, paymentTypes, change } = usePayment();
  const { balance = 0 } = useContext(UserContext);
  const total = useMemo(() => balance - totalValue);

  return (
    <Container>
      <Voltar onClick={() => history.goBack()} />
      <h2>
        Carrinho
      </h2>
      {shopping.map(element => (
        <Produto {...element} key={element.id} />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select value={paymentForm.id} onChange={(event) => change(event.target.value)}>
          {paymentTypes.map(element => <MenuItem value={element.id} key={element.id} >{element.name}</MenuItem>)}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {totalValue.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(balance).toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {total.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
          buy();
        }}
        color="primary"
        variant="contained"
        disabled={total < 0 || shopping.length === 0}
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;