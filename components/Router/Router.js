import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../WelcomeScreen';
import FirstOpenPage from '../OpenPage';
import Signup from '../SignUp';
import Login from '../Login';
import ForgetPassword from '../ForgetPassword';
import OtpVerification from '../OtpVerification';
import EmailVerifySuccessful from '../EmailVerifySuccessful';
import PinComponent from '../PINComponent';
import OtpConfirmation from '../OtpConfirmation';
import PasswordReset from '../PasswordReset';
import PasswordResetSuccessful from '../PasswordResetSuccessful';
import Dashboard from '../Dashboard';
import StockInvest from '../StockInvest';
import InvestSummary from '../InvestSummary';
import PaymentConfirmation from '../PaymentConfirmation';
import More from '../More';
import Sell from '../Sell';
import TransactionSummary from '../TransactionSummary';
import AuthenticateTransaction from '../AuthenticateTransaction';
import Wallet from '../Wallet';
import AddCreditCard from '../AddCreditCard';
import TransactionHistory from '../TransactionHistory';
import DojahWidget from '../DojahComponent';
import Withdraw from '../Withdraw';
import WithdrawalOtp from '../WithdrawalOtp';
import Tools from '../Tools';
import ReportScam from '../ReportScam';
import ReportScamSuccess from '../ReportScamSuccess';
import PersonalProfile from '../PersonalProfile';
import Security from '../Security';
import ChangePassword from '../ChangePassword';
import ChangePasswordSuccess from '../ChangePasswordSuccess';
import EditProfile from '../EditProfile';
import SetPin from '../SetPin';
import Discover from '../Discover';
import AllStocks from '../AllStocks';
import Portfolio from '../Portfolio';
import Help from '../help';
import LiveChat from '../LiveChat';
import KYC from '../KYC';
import StocksExchange from '../StocksExchange';
import StockMarket from '../StockMarket';
import PopularThisWeek from '../PopularThisWeek';
import SectorStock from '../SectorStocks';
import UKStock from '../UKStock';
import USStock from '../USStock';
import FundWallets from '../FundWallet';

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
          options={{ title: 'Welcome', headerTitleStyle: {
            color: '#51CC62',
          }, }}
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
          options={{
            title: 'Log in',
            headerTitleAlign: 'center', 
            headerTintColor: '#51CC62',
          }}
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
        options={{  title: 'Set Transaction Pin',
        headerTitleAlign: 'center', 
        headerTintColor: '#51CC62',}}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
