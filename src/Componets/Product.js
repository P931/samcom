import {
  Button,
  Grid,
  Box,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,

} from '@mui/material';
import React, { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import MoreVert from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { makeStyles } from '@mui/styles';
import { jsx } from '@emotion/react';


const useStyles = makeStyles({

  userProductDetailStyle: {

  },

  userProdtDialogContainer: {

    "&>div:nth-child(3)": {

      "&>div": {

        width: "100%",

        "&>div:nth-child(2)": {

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          // submit btn
          "&>button": {

          }

        },
      }
    }
  },

  userProductDialogContent: {

    "&>div": {

      "&>div": {

        "&>div": {
          padding: "7px 0px 7px 0px",
        },

        // product price..
        "&>div:nth-child(2)": {

          '& .MuiInput-input': {
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
            },
          }
        },

        // product quantity..
        "&>div:nth-child(3)": {

          '& .MuiInput-input': {
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
            },
          }
        },
      }
    }
  },

  userProductMenuOptList: {

    "&>div:nth-child(3)": {

      "&>ul": {
        "&>li": {
          "&>div": {
            "&>svg": {
              margin: "0px 7px 0px 0px",
            }

          }
        }
      },
    }
  }

})

const Product = () => {

  const classes = useStyles()

  const [productActionMenuEl, setProductActionMenuEl] = useState('');
  const openProductActionMenu = Boolean(productActionMenuEl);

  const [productsData, setProductsData] = useState([]);

  const [productDetails, setProductDetails] = useState({
    ProductName: "",
    ProductPrice: "",
    ProductQuantity: "",
    ProductDescription: "",
  });


  const [openProductDetailForm, setOpenProductDetailForm] = useState(false);
  const [openProductDetailFormValidation, setOpenProductDetailFormValidation] = useState(false);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleProductDetails = (e) => {

    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    })

  }

  const handleCloseProductDetailForm = () => {

    try {

      setOpenProductDetailForm(false)

    } catch (error) {
      console.log("error  handleCloseProductDetailForm is :-", error);
    }
  }

  const handleUserAddProductBtn = () => {

    setOpenProductDetailForm(true)
    setOpenProductDetailFormValidation(false)

  }


  const handleUserProductSubmitBtn = () => {

    try {

      if (productDetails.ProductName !== "" && productDetails.ProductPrice !== "" &&
        productDetails.ProductQuantity !== "" && productDetails.ProductDescription !== "") {

        setProductDetails({
          ProductName: "",
          ProductPrice: "",
          ProductQuantity: "",
          ProductDescription: "",
        })

        let products = JSON.parse(window.localStorage.getItem("productDetails")) || [];
        products.push(productDetails);
        window.localStorage.setItem("productDetails", JSON.stringify(products));

        setOpenProductDetailFormValidation(false)
        setOpenProductDetailForm(false)

      } else {

        setOpenProductDetailFormValidation(true)
      }

    } catch (error) {
      setOpenProductDetailFormValidation(true)
      console.log("error handleUserProductSubmitBtn is :- ", error);
    }

  }


  const handlUserOpenActionMenuOpt = (event) => {
    setProductActionMenuEl(event.currentTarget);
  }

  const handlUserCloseActionMenuOpt = () => {
    setProductActionMenuEl('');
  }


  const handlUserCloseActionEditMenuOpt = (row, index) => {

    try {

      setProductDetails(productsData[index])

      setOpenProductDetailForm(true)
      setOpenProductDetailFormValidation(false)

    } catch (error) {
      console.log("error in handlUserCloseActionEditMenuOpt is :- ", error);
    }

  }


  const handlUserCloseActionDeleteMenuOpt = (row, index) => {

    try {

      let productCopy = [...productsData];

      productCopy.splice(index, 1);

      setProductsData(productCopy)

      window.localStorage.setItem("productDetails", JSON.stringify(productCopy))


    } catch (error) {
      console.log("error in handlUserCloseActionDeleteMenuOpt is :- ", error);
    }
  }

  useEffect(() => {

    const storageProducts = JSON.parse(window.localStorage.getItem("productDetails"))

    if (storageProducts) {
      setProductsData(storageProducts)
    }

  }, [productDetails]);

  return (
    <Grid className={classes.userProductDetailStyle}>
      <Grid>

        <Grid>
          <Button
            variant="outlined"
            onClick={() => handleUserAddProductBtn()}
          >
            Add Product
          </Button>
        </Grid>


        <Dialog
          open={openProductDetailForm}
          onClose={() => handleCloseProductDetailForm()}
          className={classes.userProdtDialogContainer}
        >
          <Grid>
            <DialogContent className={classes.userProductDialogContent}>

              <Grid>

                <Grid>

                  <Grid>

                    <TextField
                      error={openProductDetailFormValidation === false ? "" : !productDetails.ProductName}
                      helperText={openProductDetailFormValidation === false ? "" : !productDetails.ProductName && "Please enter product name"}

                      autoFocus
                      label="Product Name"
                      fullWidth
                      variant="standard"
                      placeholder="Product Name"

                      name="ProductName"
                      value={productDetails.ProductName}
                      onChange={(e) => handleProductDetails(e)}

                    />
                  </Grid>

                  <Grid>

                    <TextField
                      error={openProductDetailFormValidation === false ? "" : !productDetails.ProductPrice}
                      helperText={openProductDetailFormValidation === false ? "" : !productDetails.ProductPrice && "Please enter product price"}

                      autoFocus
                      fullWidth
                      label="Product Price"
                      variant="standard"

                      placeholder="Product Price"
                      type="number"

                      name="ProductPrice"
                      value={productDetails.ProductPrice}
                      onChange={(e) => handleProductDetails(e)}

                    />

                  </Grid>

                  <Grid>

                    <TextField
                      error={openProductDetailFormValidation === false ? "" : !productDetails.ProductQuantity}
                      helperText={openProductDetailFormValidation === false ? "" : !productDetails.ProductQuantity && "Please enter product quantity"}

                      autoFocus
                      fullWidth
                      label="Product Quantity"
                      variant="standard"
                      placeholder="Product Quantity"
                      type="number"

                      name="ProductQuantity"
                      value={productDetails.ProductQuantity}
                      onChange={(e) => handleProductDetails(e)}

                    />

                  </Grid>

                  <Grid>

                    <TextField
                      error={openProductDetailFormValidation === false ? "" : !productDetails.ProductDescription}
                      helperText={openProductDetailFormValidation === false ? "" : !productDetails.ProductDescription && "Please enter product description"}

                      autoFocus
                      fullWidth
                      label="Product Description"
                      variant="standard"
                      placeholder="Product Description"

                      name="ProductDescription"
                      value={productDetails.ProductDescription}
                      onChange={(e) => handleProductDetails(e)}

                    />

                  </Grid>

                </Grid>

              </Grid>

            </DialogContent>
          </Grid>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                handleUserProductSubmitBtn()
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>


        <Grid>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Product Name</TableCell>
                  <TableCell align="right">Product Price</TableCell>
                  <TableCell align="right">Product Quantity</TableCell>
                  <TableCell align="right">Product Description</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => ( */}
                {productsData?.map((row, index) => (
                  <TableRow
                    // key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >

                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">
                      {row.ProductName}
                    </TableCell>
                    <TableCell align="right">{row.ProductPrice}</TableCell>
                    <TableCell align="right">{row.ProductQuantity}</TableCell>
                    <TableCell align="right">{row.ProductDescription}</TableCell>

                    <TableCell align="right">

                      <Box>
                        <Tooltip title="">
                          <IconButton
                            onClick={(e) => handlUserOpenActionMenuOpt(e)}
                            size="small"
                            sx={{ ml: 2 }}
                            style={{ backgroundColor: "white", cursor: "pointer", margin: "0px 12px 0px 0px" }}
                          >

                            <MoreVert />

                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Menu
                        anchorEl={productActionMenuEl}
                        id="account-menu"
                        open={openProductActionMenu}
                        onClick={() => handlUserCloseActionMenuOpt()}

                        className={classes.userProductMenuOptList}

                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={() => handlUserCloseActionEditMenuOpt(row, index)}>
                          <ListItemIcon >
                            <EditOutlinedIcon />
                            Edit
                          </ListItemIcon>
                        </MenuItem>

                        <MenuItem onClick={() => handlUserCloseActionDeleteMenuOpt(row, index)}>
                          <ListItemIcon >
                            <DeleteOutlineOutlinedIcon />
                            Delete
                          </ListItemIcon>
                        </MenuItem>

                      </Menu>

                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>

      </Grid>
    </Grid>
  );
}

export default Product;
