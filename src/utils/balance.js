var swg = window.require('safex-addressjs');

/**
 * Verify Safex Address
 */
function verify_safex_address(spend, view, address) {
    var spend_pub = swg.sec_key_to_pub(spend);
    var view_pub = swg.sec_key_to_pub(view);

    var _address = swg.pubkeys_to_string(spend_pub, view_pub);

    if (_address == address) {
        return true;
    } else {
        return false;
    }
}

/**
 * Structure Safex Address
 *
 * key object
 * {
 *     spend : {
 *         sec : secret_key
 *         pub: : public_key
 *     },
 *     view : {
 *         sec : secret_key
 *         pub: : public_key
 *     },
 *     checksum : checksum of address
 * }
 */
function structureSafexKeys(spend, view) {
    const keys = swg.structure_keys(spend, view);
    const checksum = swg.address_checksum(keys.spend.pub, keys.view.pub);
    keys["checksum"] = checksum;

    return keys;
}

/**
 * Open Balance Alert Popup
 * @param alert
 * @param alert_state
 * @param disabled
 */
function openBalanceAlert(target, alert, alert_state, disabled) {
    target.setState({
        [alert_state]: true,
        balance_alert_text: alert,
        balance_alert_close_disabled: disabled
    });
}

/**
 * Close Balance Alert Popup
 */
function closeBalanceAlert(target) {
    target.setState({
        balance_alert: false,
        open_file_alert: false,
        create_new_wallet_alert: false,
        create_from_keys_alert: false,
        balance_alert_close_disabled: false
    });
}

/**
 * Open Send Cash Popup
 */
function openSendCashPopup(target) {
    target.setState({
        send_cash: true,
        send_token: false
    });
}

/**
 * Open Send Token Popup
 */
function openSendTokenPopup(target) {
    target.setState({
        send_token: true,
        send_cash: false
    });
}

/**
 * Close Send Popup
 */
function closeSendPopup(target) {
    target.setState({
        send_cash: false,
        send_token: false,
    });
}

module.exports = {
    verify_safex_address,
    structureSafexKeys,
    openBalanceAlert,
    closeBalanceAlert,
    openSendCashPopup,
    openSendTokenPopup,
    closeSendPopup
};