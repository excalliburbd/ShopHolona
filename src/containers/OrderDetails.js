import { connect } from 'react-redux';
import moment from 'moment';

import OrderDeatils from '../components/BackOffice/OrderDetails';

import { getSelectedOrder } from '../selectors/orderSelectors';
import { getOrderStatus } from '../selectors/backOfficeSelectors';
import { changeOrderStatus } from '../thunks/ordersThunks';
import { getShopID } from '../selectors/shopSelectors';
import { getToken } from '../selectors/userSelectors';

const mapStateToProps = state => {
  const orderDetails = getSelectedOrder(state);

  return {
    id: `IN${orderDetails.id}`,
    date: `${ moment(orderDetails.created_at).toDate() }`,
    status: getOrderStatus(orderDetails.order_status),
    shPrice: orderDetails.total_sh_price,
    price: orderDetails.total_price,
    shop: getShopID(state),
    token: getToken(state),
    productList: orderDetails.details || [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChangeOrderStatus: (shop, token, order, status) => {
      dispatch(changeOrderStatus(shop, token, order, status));
    },
    getOrderStatus: id => {
      return getOrderStatus(id);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDeatils);
