import LazyLoading from '../../LazyLoading/LazyLoading';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './PizzaList.module.scss';
import PizzaListItem from "./PizzaListItem/PizzaListItem";

const PizzaList = props => {
    // const updatedPizzaList = props.pizzaList.reduce((resultArray, item, index) => {
    //     const chunkIndex = Math.floor(index / 4);

    //     if (!resultArray[chunkIndex]) {
    //         resultArray[chunkIndex] = [];
    //     }

    //     resultArray[chunkIndex].push(item);

    //     return resultArray;
    // }, []);

    // const renderPizzaList = updatedPizzaList.map((pizzaRow, key) => (
    //     <div key={key} className={classes.PizzaList__Row}>
    //         {pizzaRow.map((pizzaItem, key2) => (
    //             <PizzaListItem
    //                 key={key2}
    //                 pizzaDetail={{
    //                     id: pizzaItem.id,
    //                     name: pizzaItem.name,
    //                     price: pizzaItem.price,
    //                     image: pizzaItem.image
    //                 }}
    //             />
    //         ))}
    //     </div>
    // ));

    const onLazyLoadVisibleHandler = () => {
        if (!props.isLazyLoading) {
            props.fetchNextPizzaList(parseInt(props.currentPage) + 1, props.itemPerPage);
        }
    }

    const renderPizzaList = props.pizzaList.map((pizzaItem, index) => (
        <PizzaListItem
            key={index}
            addPizzaToCart={props.addPizzaToCart}
            pushNewFlashMessage={props.pushNewFlashMessage}
            pizzaDetail={{
                id: pizzaItem.id,
                name: pizzaItem.name,
                price: pizzaItem.price,
                image: pizzaItem.image,
                description: pizzaItem.description
            }}
        />
    ));

    return (
        <div className={classes.PizzaList}>
            {renderPizzaList}
            {props.shouldLazyLoad ? props.isLazyLoading ? (
                <Spinner />
            ) : (
                <LazyLoading onVisible={onLazyLoadVisibleHandler} />
            ) : null}
        </div>
    );
};

export default PizzaList;