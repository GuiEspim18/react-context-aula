import { createContext, useContext, useEffect, useState } from "react";

export const ShoppingContext = createContext();
ShoppingContext.displayName = "Shopping";

export const ShoppingProvider = ({ children }) => {
    const [shopping, setShopping] = useState([]);
    const [quantity, setQuantity] = useState(0)

    return (
        <ShoppingContext.Provider value={{ shopping, setShopping, quantity, setQuantity }}>
            {children}
        </ShoppingContext.Provider>
    );
}

// criando o hook do carrinho para que o componente não fique com a responsabilidade de executar essa tarefa

export const useShopping = () => {
    // usando o contexto e pegando os states do provider
    const { shopping, setShopping, quantity, setQuantity } = useContext(ShoppingContext)

    // função utilitaria de adicionar quantidade
    function changeQuantity(id, quantity) {
        // faz um map no carrinho a procura do produto com o id passado e se ele achar ele vai mudar a quantidade dele
        return shopping.map(element => {
            if (element.id === id) element.quantity += quantity
            return element
        })
    }

    function addProduct(product) {
        // vai pegar o produto que deseja adicionar e vai verificar se já existe no carrinho
        const cotainsPorduct = shopping.some(element => element.id === product.id);
        if (!cotainsPorduct) {
            // se não existir vai adicionar a quantidade de um e vai adicionar ao carrinho com o carrinho anterior mais o produto
            product.quantity = 1;
            return setShopping(previous => [...previous, product]);
        }
        // se não vai passar o id e vai adicionar +1 na quantidade do produto
        setShopping(changeQuantity(product.id, 1))
    }

    function removeProduct(id) {
        // achando o produto
        const product = shopping.find(element => element.id === id);
        // verificando se a quantidade do produto é igual a um
        const last = product.quantity === 1;
        if (last) {
            // se for igual a 1 ele vai retornar todos os produtos fazendo um filtro onde os que vão permnecer são apenas os que possuem id diferente do produto removido
            return setShopping(previous => previous.filter(item => item.id !== id));
        }
        // se não a gente vai chamar a função passando o id do produto que vai remover - a quantidade de 1 
        setShopping(changeQuantity(id, -1))
    }

    useEffect(() => {
        const newQuantity = shopping.reduce((counter, product) => counter + product.quantity, 0)
        setQuantity(newQuantity)
    }, [shopping, setQuantity])

    // retrornando os states do provider e as nossas funções de remover e adicionar
    return { shopping, setShopping, addProduct, removeProduct, quantity }
}