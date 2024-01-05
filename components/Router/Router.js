import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../main/WelcomeScreen';
import FirstOpenPage from '../main/OpenPage';
import Signup from '../Auths/SignUp';
import Login from '../Auths/Login';
import ForgetPassword from '../Auths/ForgetPassword';
import OtpVerification from '../Auths/OtpVerification';
import EmailVerifySuccessful from '../Auths/EmailVerifySuccessful';
import PinComponent from '../main/PINComponent';
import OtpConfirmation from '../Auths/OtpConfirmation';
import PasswordReset from '../Auths/PasswordReset';
import PasswordResetSuccessful from '../Auths/PasswordResetSuccessful';
import Dashboard from '../main/Dashboard';
import StockInvest from '../Stock/StockInvest';
import InvestSummary from '../transactions/InvestSummary';
import PaymentConfirmation from '../transactions/PaymentConfirmation';
import More from '../main/More';
import Sell from '../main/Sell';
import TransactionSummary from '../transactions/TransactionSummary';
import AuthenticateTransaction from '../transactions/AuthenticateTransaction';
import Wallet from '../main/Wallet';
import AddCreditCard from '../main/AddCreditCard';
import TransactionHistory from '../transactions/TransactionHistory';
import DojahWidget from '../main/DojahComponent';
import Withdraw from '../transactions/Withdraw';
import WithdrawalOtp from '../transactions/WithdrawalOtp';
import Tools from '../main/Tools';
import ReportScam from '../main/ReportScam';
import ReportScamSuccess from '../main/ReportScamSuccess';
import PersonalProfile from '../main/PersonalProfile';
import Security from '../main/Security';
import ChangePassword from '../Auths/ChangePassword';
import ChangePasswordSuccess from '../Auths/ChangePasswordSuccess';
import EditProfile from '../main/EditProfile';
import SetPin from '../main/SetPin';
import Discover from '../main/Discover';
import AllStocks from '../Stock/AllStocks';
import Portfolio from '../main/Portfolio';
import Help from '../main/help';
import LiveChat from '../main/LiveChat';
import KYC from '../main/KYC';
import StocksExchange from '../Stock/StocksExchange';
import StockMarket from '../Stock/StockMarket';
import PopularThisWeek from '../Stock/PopularThisWeek';
import SectorStock from '../Stock/SectorStocks';
import UKStock from '../Stock/UKStock';
import USStock from '../Stock/USStock';
import FundWallets from '../main/FundWallet';
import TopUpReceipt from '../transactions/TopUpReceipt';
import PaymentFailed from '../transactions/PaymentFailed';
import StockDetails from '../Stock/StockDetails';
import FAQ from '../main/FAQ';
import ContactForm from '../main/Contact';
import Notification from '../main/Notifications';
import InvestmentConfirm from '../Stock/InvestmentSuccessfull';
import SellConfirm from '../Stock/SellSuccesfull';
import ConvertFunds from '../transactions/Convertfunds';
import AddSettlementAccountModal from '../transactions/More/AddSettlementAccountModal';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={FirstOpenPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: '', headerTitleStyle: {
            color: '#51CC62',
          }, }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="EmailVerifySuccessful"
          component={EmailVerifySuccessful}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="PinComponent"
          component={PinComponent}
          options={{ title: 'PIN' }}
        />
        <Stack.Screen
          name="OtpConfirmation"
          component={OtpConfirmation}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="PasswordResetSuccessful"
          component={PasswordResetSuccessful}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StockInvest"
          component={StockInvest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InvestSummary"
          component={InvestSummary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentConfirm"
          component={PaymentConfirmation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentFailed"
          component={PaymentFailed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="More"
          component={More}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sell"
          component={Sell}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransactionSummary"
          component={TransactionSummary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthTrans"
          component={AuthenticateTransaction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCreditCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transactions"
          component={TransactionHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dojah"
          component={DojahWidget}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Withdraw"
          component={Withdraw}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WithdrawOtp"
          component={WithdrawalOtp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tools"
          component={Tools}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportScam"
          component={ReportScam}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportScamSuccess"
          component={ReportScamSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Personal"
          component={PersonalProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Security"
          component={Security}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="ChangePasswordSuccess"
        component={ChangePasswordSuccess}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="SetPin"
        component={SetPin}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Discover"
        component={Discover}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="AllStock"
        component={AllStocks}
        options={{ headerShown: false }}
        />
         <Stack.Screen
        name="StockDetails"
        component={StockDetails}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="LiveChat"
        component={LiveChat}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="KYC"
        component={KYC}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="StockExchange"
        component={StocksExchange}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="StockMarket"
        component={StockMarket}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Popular"
        component={PopularThisWeek}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Sectors"
        component={SectorStock}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="UKStock"
        component={UKStock}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="USStock"
        component={USStock}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="FundWallet"
        component={FundWallets}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="TopUpReceipt"
        component={TopUpReceipt}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Contact"
        component={ContactForm}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="InvConfirm"
        component={InvestmentConfirm}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="SellConfirm"
        component={SellConfirm}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="ConvertFund"
        component={ConvertFunds}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="AddSettle"
        component={AddSettlementAccountModal}
        options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
