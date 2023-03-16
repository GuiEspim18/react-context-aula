import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useShopping } from 'common/contexts/Shopping/Shopping';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const { quantity } = useShopping()
  const history = useHistory();

  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={quantity===0}
      >
        <Badge
          color="primary"
          badgeContent={quantity}
          onClick={() => history.push('/carrinho')}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}