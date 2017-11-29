import { connect } from 'react-redux';
import moment from 'moment';

import OrderDeatils from '../components/BackOffice/OrderDetails';

import { getSelectedOrder } from '../selectors/orderSelectors';
import { getOrderStatus } from '../selectors/backOfficeSelectors';

const mapStateToProps = state => {
  const orderDetails = getSelectedOrder(state);

  return {
    id: `IN${orderDetails.id}`,
    date: `${ moment(orderDetails.created_at).toDate() }`,
    status: getOrderStatus(orderDetails.order_status),
    shPrice: orderDetails.total_sh_price,
    price: orderDetails.total_price,
  }
}

export default connect(mapStateToProps, () => ({}))(OrderDeatils);
