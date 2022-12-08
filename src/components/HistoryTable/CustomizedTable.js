import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ellipseAddress } from '../utils';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#1e293b",
    color: "#94a3b8",
    border: 'none'
  },
  body: {
    fontSize: 14,
    color: 'white',
    border: 'none'
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#141c2e",
      color: 'white'
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#1d2536",
        color: 'white'
      }
  },
});

function CustomizedTable(props) {
  const { classes } = props;
  const rows = props.data;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Tx Hash</CustomTableCell>
            <CustomTableCell align="right">First Name</CustomTableCell>
            <CustomTableCell align="right">Last Name</CustomTableCell>
            <CustomTableCell align="right">Email Address</CustomTableCell>
            <CustomTableCell align="right">Address</CustomTableCell>
            <CustomTableCell align="right">City</CustomTableCell>
            <CustomTableCell align="right">State</CustomTableCell>
            <CustomTableCell align="right">Zip/Postal Code</CustomTableCell>
            <CustomTableCell align="right">Country</CustomTableCell>
            <CustomTableCell align="right">Payment Address</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.txHash}>
              <CustomTableCell component="th" scope="row">
                {ellipseAddress(row.txHash)}
              </CustomTableCell>
              <CustomTableCell align="right">{row.firstName}</CustomTableCell>
              <CustomTableCell align="right">{row.lastName}</CustomTableCell>
              <CustomTableCell align="right">{row.emailAddr}</CustomTableCell>
              <CustomTableCell align="right">{row.address}</CustomTableCell>
              <CustomTableCell align="right">{row.city}</CustomTableCell>
              <CustomTableCell align="right">{row.state}</CustomTableCell>
              <CustomTableCell align="right">{row.zip}</CustomTableCell>
              <CustomTableCell align="right">{row.country}</CustomTableCell>
              <CustomTableCell align="right">{ellipseAddress(row.payment)}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);