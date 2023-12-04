import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from "react-redux";
import AlertDialog from '../components/AlertDialog';
import CircularLoading from "../components/CircularLoading";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import { api } from 'common';
import { useTranslation } from "react-i18next";
import CountryListSelect from '../components/CountryListSelect';
import { colors } from '../components/Theme/WebTheme';
import Button from "components/CustomButtons/Button.js";
import { PanicSettings, BookingImageSettings } from 'common/sharedFunctions';
import { DispatchSettings } from 'common/sharedFunctions';
import { showEst } from 'common/sharedFunctions';
import { optionsRequired } from 'common/sharedFunctions';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    alignContent: 'center'
  },
  container1: {
    backgroundColor: colors.Header_Text,
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    padding: '30px',
    width: '100%',
    top: "19px",
    boxShadow: "4px 4px 6px #9E9E9E"
  },
  gridcontainer: {
    alignContent: 'center'
  },
  items: {
    margin: 0,
    width: '100%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 192,
    height: 192
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    backgroundColor: colors.Header,
    alignContent: 'center',
    borderRadius: "8px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rootRtl: {
    "& label": {
      right: 10,
      left: "auto",
      paddingRight: 20
    },
    "& legend": {
      textAlign: "right",
      marginRight: 20
    }
  },
  rootRtl_1: {
    "& label": {
      right: 15,
      left: "auto",
      paddingRight: 25
    },
    "& legend": {
      textAlign: "right",
      marginRight: 25
    }
  },
  rootRtl_2: {
    "& label": {
      right: 10,
      left: "auto",
      paddingRight: 12
    },
    "& legend": {
      textAlign: "right",
      marginRight: 25
    }
  },
  right: {
    "& legend": {
      marginRight: 30
    },
  },
  rightStorelink: {
    "& legend": {
      marginRight: 25
    },
  },
  title: {
    color: colors.Header_Text,
    marginBottom: '15px',
    paddingTop: '15px',
    paddingLeft: '15px',
    fontSize: '20px'
  },
  buttonStyle: {
    margin: 0,
    width: '100%',
    height: 40,
    borderRadius: "30px",
    backgroundColor: colors.Header,
    color:'#FFF'
  }
}));

const GeneralSettings = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const {
    editSettings,
    clearSettingsViewError,
    countries
  } = api;
  const settingsdata = useSelector(state => state.settingsdata);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [data, setData] = useState();
  const [clicked, setClicked] = useState(false);
  const [countryCode, setCountryCode] = useState();
  const [country, setCountry] = useState(false);

  useEffect(() => {
    if (data) {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].label === data.country) {
          setCountryCode(countries[i]);
        }
        if (countries[i].code === data.restrictCountry) {
          setCountry(countries[i]);
        }
      }
    }
  }, [data, countries]);


  useEffect(() => {
    if (settingsdata.settings) {
      setData(settingsdata.settings);
    }
  }, [settingsdata.settings]);

  const handleSwitchChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const handleTextChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (value) => {
    setData({ ...data, country: value.label });
  };

  const handleCountryCode = (value) => {
    setData({ ...data, restrictCountry: value.code });
  };

  const handleBonusChange = (e) => {
    setData({ ...data, bonus: parseFloat(e.target.value) >= 0 ? parseFloat(e.target.value) : '' });
  };

  const handleDecimalChange = (e) => {
    setData({ ...data, decimal: parseFloat(e.target.value) >= 0 ? parseFloat(e.target.value) : '' });
  };

  const handleDriverRadius = (e) => {
    setData({ ...data, driverRadius: parseFloat(e.target.value) >= 0 ? parseFloat(e.target.value) : '' });
  };

  const handleWalletMoney = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.AllowCriticalEditsAdmin) {
      if((data.mobileLogin === false && data.emailLogin === true) || (data.mobileLogin === true && data.emailLogin === false) || (data.mobileLogin === true && data.emailLogin === true)) {
        if (data.bonus === '') {
          alert(t('proper_bonus'))
        } else {
          setClicked(true);
          dispatch(editSettings(data));
        }
      } else {
        alert(t('mobile_or_email_cant_off'));
      }
    } else {
      alert(t('demo_mode'));
    }
  }

  const handleClose = () => {
    setClicked(false);
    dispatch(clearSettingsViewError());
  };


  return (
    data ?
      <form className={classes.form}>
        <Grid item xs={12} sm={12}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title} style={{ textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
              {t('general_settings')}
            </Typography>
          </Grid>
          <div className={classes.container1}>
            <Grid container spacing={2} style={{ direction: isRTL === 'rtl' ? 'rtl' : 'ltr' }} >
              <Grid item xs={12} sm={12} md={6} lg={6} >
                <Typography component="h1" variant="h5" style={{ textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
                  {t('currency_settings')}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={4} lg={4} >
                    <TextField
                      className={isRTL === "rtl" ? classes.rootRtl : null}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="symbol"
                      label={t('currency_symbol')}
                      name="symbol"
                      autoComplete="symbol"
                      onChange={handleTextChange}
                      value={data.symbol}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      className={isRTL === "rtl" ? classes.rootRtl : null}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="code"
                      label={t('currency_code')}
                      name="code"
                      autoComplete="code"
                      onChange={handleTextChange}
                      value={data.code}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      className={isRTL === "rtl" ? classes.rootRtl : null}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="decimal"
                      label={t('set_decimal')}
                      name="decimal"
                      autoComplete="decimal"
                      onChange={handleDecimalChange}
                      value={data.decimal}
                    />
                  </Grid>
                  <FormControlLabel
                    style={{ marginLeft: '6px', marginBottom: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                    control={
                      <Switch
                        checked={data.swipe_symbol}
                        onChange={handleSwitchChange}
                        name="swipe_symbol"
                        color="primary"
                      />
                    }
                    label={t('swipe_symbol')}
                  />
                  <FormControlLabel
                    style={{ marginLeft: '6px', marginBottom: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                    control={
                      <Switch
                        checked={data.disable_online}
                        onChange={handleSwitchChange}
                        name="disable_online"
                        color="primary"
                      />
                    }
                    label={t('disable_online')}
                  />                  
                  <FormControlLabel
                  style={{ marginLeft: '6px', marginBottom: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.disable_cash}
                      onChange={handleSwitchChange}
                      name="disable_cash"
                      color="primary"
                    />
                  }
                  label={t('disable_cash')}
                />
                </Grid>
                <Typography component="h1" variant="h5" style={{ marginTop: '15px', textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
                  {t('security_title')}
                </Typography>
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row', }}
                  control={
                    <Switch
                      checked={data.otp_secure}
                      onChange={handleSwitchChange}
                      name="otp_secure"
                      color="primary"
                    />
                  }
                  label={t('settings_label3')}
                />
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.driver_approval}
                      onChange={handleSwitchChange}
                      name="driver_approval"
                      color="primary"
                    />
                  }
                  label={t('settings_label4')}
                />
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.carApproval}
                      onChange={handleSwitchChange}
                      name="carApproval"
                      color="primary"
                    />
                  }
                  label={t('settings_label5')}
                />
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.imageIdApproval}
                      onChange={handleSwitchChange}
                      name="imageIdApproval"
                      color="primary"
                    />
                  }
                  label={t('settings_label6')}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography component="h1" variant="h5" style={{ marginTop: '13px', textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
                      {t('referral_bonus')}
                    </Typography>
                    <TextField
                      className={isRTL === "rtl" ? classes.rootRtl : null}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="bonus"
                      label={t('referral_bonus')}
                      name="bonus"
                      autoComplete="bonus"
                      onChange={handleBonusChange}
                      value={data.bonus}
                    />
                  </Grid>
                </Grid>
                <Typography component="h1" variant="h5" style={{ marginTop: '10px', textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
                  {t('wallet_money_field')}
                </Typography>
                <TextField
                  className={isRTL === "rtl" ? classes.rootRtl : null}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="walletMoneyField"
                  label={t('wallet_money_field')}
                  name="walletMoneyField"
                  autoComplete="walletMoneyField"
                  onChange={handleWalletMoney}
                  value={data.walletMoneyField}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography component="h1" variant="h5" style={{ textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
                  {t('advance_settings')}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6} >
                    <CountryListSelect
                      label={t('select_country')}
                      dis={true}
                      countries={countries}
                      onlyCode={false}
                      value={countryCode ? countryCode : null}
                      onChange={
                        (object, value) => {
                          handleCountryChange(value);
                        }
                      }
                      style={{ marginTop: 16 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} >
                    <CountryListSelect
                      label={t('country_restriction')}
                      dis={true}
                      countries={countries}
                      onlyCode={true}
                      value={country ? country : null}
                      onChange={
                        (object, value) => {
                          handleCountryCode(value);
                        }
                      }
                      style={{ marginTop: 16 }}
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.AllowCountrySelection}
                      onChange={handleSwitchChange}
                      name="AllowCountrySelection"
                      color="primary"
                    />
                  }
                  label={t('allow_multi_country')}
                />
                <FormControlLabel
                  style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.convert_to_mile}
                      onChange={handleSwitchChange}
                      name="convert_to_mile"
                      color="primary"
                    />
                  }
                  label={t('convert_to_mile')}
                />
                <BookingImageSettings
                  data = {data}
                  handleSwitchChange = {handleSwitchChange}
                />
                <FormControlLabel
                  style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.RiderWithDraw}
                      onChange={handleSwitchChange}
                      name="RiderWithDraw"
                      color="primary"
                    />
                  }
                  label={t('rider_withdraw')}
                />
                <FormControlLabel
                  style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.horizontal_view}
                      onChange={handleSwitchChange}
                      name="horizontal_view"
                      color="primary"
                    />
                  }
                  label={t('car_view_horizontal')}
                />
                <FormControlLabel
                  style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.useDistanceMatrix}
                      onChange={handleSwitchChange}
                      name="useDistanceMatrix"
                      color="primary"
                    />
                  }
                  label={t('use_distance_matrix')}
                />
                  <FormControlLabel
                  style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.CarHornRepeat}
                      onChange={handleSwitchChange}
                      name="CarHornRepeat"
                      color="primary"
                    />
                  }
                  label={t('car_horn_repeat')}
                />
                {showEst && (!optionsRequired) ?
                  <FormControlLabel
                  style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.prepaid}
                      onChange={handleSwitchChange}
                      name="prepaid"
                      color="primary"
                    />
                  }
                  label={t('prepaid')}
                />
                : null}
                  <Typography component="h1" variant="h5" style={{ marginTop: '15px', textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
                {t('login_settings')}
              </Typography>
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.emailLogin}
                      onChange={handleSwitchChange}
                      name="emailLogin"
                      color="primary"
                    />
                  }
                  label={t('email_login')}
                />
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.mobileLogin}
                      onChange={handleSwitchChange}
                      name="mobileLogin"
                      color="primary"
                    />
                  }
                  label={t('mobile_login')}
                />
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.socialLogin}
                      onChange={handleSwitchChange}
                      name="socialLogin"
                      color="primary"
                    />
                  }
                  label={t('social_login')}
                />
                <Typography component="h1" variant="h5" style={{ marginTop: '15px', textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
                  {t('driver_setting')}
                </Typography>
                <TextField
                  className={isRTL === "rtl" ? classes.rootRtl : null}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="driverRadius"
                  label={t('driverRadius')}
                  name="driverRadius"
                  autoComplete="driverRadius"
                  onChange={handleDriverRadius}
                  value={data.driverRadius}
                />
                <DispatchSettings
                    autoDispatch = {data.autoDispatch}
                    onChange={handleSwitchChange}
                />
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.negativeBalance}
                      onChange={handleSwitchChange}
                      name="negativeBalance"
                      color="primary"
                    />
                  }
                  label={t('negative_balance')}
                />
                 <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row', }}
                  control={
                    <Switch
                      checked={data.realtime_drivers}
                      onChange={handleSwitchChange}
                      name="realtime_drivers"
                      color="primary"
                    />
                  }
                  label={t('realtime_drivers')}
                />
                <FormControlLabel
                  style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.bank_fields}
                      onChange={handleSwitchChange}
                      name="bank_fields"
                      color="primary"
                    />
                  }
                  label={t('bank_fields')}
                />
                <FormControlLabel
                  style={{flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.showLiveRoute}
                      onChange={handleSwitchChange}
                      name="showLiveRoute"
                      color="primary"
                    />
                  }
                  label={t('show_live_route')}
                />

                <FormControlLabel
                  style={{flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.carType_required}
                      onChange={handleSwitchChange}
                      name="carType_required"
                      color="primary"
                    />
                  }
                  label={t('carType_required')}
                />

                <FormControlLabel
                  style={{flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.term_required}
                      onChange={handleSwitchChange}
                      name="term_required"
                      color="primary"
                    />
                  }
                  label={t('term_required')}
                />

                <FormControlLabel
                  style={{flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                  control={
                    <Switch
                      checked={data.license_image_required}
                      onChange={handleSwitchChange}
                      name="license_image_required"
                      color="primary"
                    />
                  }
                  label={t('license_image_required')}
                />

                <PanicSettings
                  classes={classes}
                  data={data} 
                  handleTextChange={handleTextChange}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  variant="contained"
                  color="secondaryButton"
                  className={classes.buttonStyle}
                >
                  {t('submit')}
                </Button>

              </Grid>
            </Grid>
          </div>
          <AlertDialog open={settingsdata.error.flag && clicked} onClose={handleClose}>{t('update_failed')}</AlertDialog>
        </Grid>
      </form>
      :
      <CircularLoading />
  );

}

export default GeneralSettings;
