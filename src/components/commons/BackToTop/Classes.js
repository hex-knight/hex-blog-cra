import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
      rt: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        boxShadow: '0 0 5px 2px #828282',
        borderRadius: 45
      },
      retrn: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(8),
        boxShadow: '0 0 5px 2px #828282',
        borderRadius: 45
      }
}));