import { connect } from 'react-redux';
import { useEffect } from 'react';
import { isBrowser } from 'react-device-detect';

import * as actions from '../../store/actions';
import PageContainer from "../../hoc/PageContainer/PageContainer";
import PizzaList from "../../components/Pizza/PizzaList/PizzaList";
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import RetryFallback from '../../components/RetryFallback/RetryFallback';

export const CustomerHome = props => {
    useEffect(() => {
        props.fetchPizzaList(isBrowser ? 8 : 2);
    }, []);

    const retryFetchingHandler = () => {
        props.fetchPizzaList(isBrowser ? 8 : 2);
    }

    return (
        <PageContainer>
            {props.pizzaListLoading ? <Spinner /> : props.pizzaListError ? <RetryFallback onRetry={retryFetchingHandler} />: (
                <Auxiliary>
                    <h1>Bringing you the best pizzas</h1>

                    <PizzaList
                        pizzaList={props.pizzaList}
                        addPizzaToCart={props.addPizzaToCart}
                        pushNewFlashMessage={props.pushNewFlashMessage}
                        currentPage={props.pizzaListLazyLoad ? props.pizzaListLazyLoad.currentPage : 1}
                        shouldLazyLoad={props.pizzaListLazyLoad ? parseInt(props.pizzaListLazyLoad.currentPage) !== parseInt(props.pizzaListLazyLoad.totalPages) : false}
                        fetchNextPizzaList={props.fetchNextPizzaList}
                        itemPerPage={2}
                        isLazyLoading={props.isLazyLoading}
                    />
                </Auxiliary>
            )}
        </PageContainer >
    );
};

const mapStateToProps = state => ({
    pizzaList: state.pizzaList.pizzaList,
    pizzaListLoading: state.pizzaList.isLoading,
    pizzaListError: state.pizzaList.error,
    pizzaListLazyLoad: state.pizzaList.lazyLoad,
    isLazyLoading: state.pizzaList.isLazyLoading
});

const mapDispatchToProps = dispatch => ({
    addPizzaToCart: (pizzaDetail) => dispatch(actions.addPizzaToCart(pizzaDetail)),
    pushNewFlashMessage: (newMessage) => dispatch(actions.pushNewFlashMessage(newMessage)),
    fetchPizzaList: (perPage) => dispatch(actions.fetchPizzaList(perPage)),
    fetchNextPizzaList: (page, perPage) => dispatch(actions.fetchNextPizzaList(page, perPage)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerHome);