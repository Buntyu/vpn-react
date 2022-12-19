import React from 'react';
import { useState } from 'react';
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Button, IconButton, Typography } from '@mui/material';
import { useTable } from 'react-table'
import { DeleteDevice, GetAccount, PaymentManager} from './services/account.service';
import NewDeviceDialog from './newDeviceDialog'
import ConfigDisplayModal from './Components/ConfigDisplayModal';
import { useClasses } from './Components/MaterialUtils';
import AccountInfo from './Components/AccountInfo';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Payment from './Components/Payment'

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    })
    const classes = useClasses({});
    // Render the UI for your table
    return (
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </MaUTable>
    )
  }



const Account = ({ handleLogout, accountId }) => {

  // const classes = useClasses({})
  const [anAccount, setAccount] = useState({ uuid: accountId , devices: [] , max_devices: 0})
  const [ newDeviceModal, setNewDeviceModal ] = useState(false)
  const [ newConfigModal, setNewConfigModal ] = useState(false)
  const [ lastConfig, setLastConfig ] = useState({})
  const [ accountMangement, setAccountManagement ] = useState({ url: "" })
  const [isLoading, setLoading] = useState(false);


  async function populateDeviceData() {
    setLoading(true);
    //let response = await ApiCall(func_name, method, path, verbosity, body)
    GetAccount(anAccount.uuid)
    .then( a_account => {
      setAccount(a_account)
      setLoading(false)
    })
    .catch( err => {
      handleLogout()
    })
  }

  async function populatePaymentManagement() {
    PaymentManager(anAccount.uuid)
    .then( result => {
      setAccountManagement(result)
    })
    .catch( err=> {
      setAccountManagement({ url: "" })
    })
  }

  React.useEffect(() => {
    populatePaymentManagement();
  }, [anAccount]);

  React.useEffect(() => {
    populateDeviceData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Devices',
        columns: [
          {
            Header: 'IP address',
            accessor: 'ipv4_address',
          },
          {
            Header: 'Public key',
            accessor: 'public_key',
          },
          {
            Header: 'Actions',
            id: 'actions',
            accesor: 'uuid',
            Cell: ({row})  => (
              <IconButton
                aria-label='delete'
                onClick={() => handleDelete(row.original)}
                size="large">
                <DeleteIcon />
              </IconButton>
            )

          },
        ],
      },
    ],
    [anAccount]
  )

  //const data = React.useMemo(() => devices, [anAccount, devices])

  function AddDevice() {
    setNewDeviceModal(true)
  }

  function handleDelete(a_row) {
    // console.log("Account.handleDelete a_row=", a_row)
    DeleteDevice(anAccount.uuid, a_row.public_key )
    .then( success => { 
      populateDeviceData()
    })
    .catch( err => {
      console.error("Account.handleDelete unexpected error: ", err )
    })
  }

  function handleNewDevice(a_form,reason) {
    setNewDeviceModal(false)
    if( reason && reason == "backdropClick")
      return;
    setLastConfig(a_form)
    setNewConfigModal(true)
    populateDeviceData()
  }

  function handleConfigDisplay() {
    setLastConfig({})
    setNewConfigModal(false)
  }

  return (
    <>
        <AccountInfo handleLogout={handleLogout} accountId={anAccount.uuid} timeout={anAccount.timeout} status={anAccount.status}/>
        <br />
        <Payment accountId={anAccount.uuid} accountManager={accountMangement.url}/>

        <Button
          color="secondary"
          onClick={AddDevice}
          disabled={ anAccount.devices && anAccount.max_devices <=  anAccount.devices.length }
          startIcon={<AddCircleIcon />} 
        >
          Add Device 
        </Button>
        
        <NewDeviceDialog open={newDeviceModal} handleClose={handleNewDevice} accountId={anAccount.uuid}/>
        <ConfigDisplayModal open={newConfigModal} handleClose={handleConfigDisplay} data={lastConfig}/>
        { !isLoading && anAccount.devices && anAccount.devices !== null
         ? <Table columns={columns} data={anAccount.devices} /> 
         : <Typography >No Devices found, add a device</Typography>
       }
    </>
  );
};

export default Account;