import { Chip, Grid, List, TextField } from "@mui/material";
import Products_Card from "../../components/Products_Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SortIcon from '@mui/icons-material/Sort';
import CategoryIcon from '@mui/icons-material/Category';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {
  getCategoriesList,
  getProductsList,
  searchProduct,
  selectGategory,
  sortAscend,
  sortDescend,
  sortRating,
} from "../../redux/action/Products";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { height } from "@mui/system";


function Products() {
  const ProductsList = useSelector((state) => state.ProductsReducer.list);
  const CategoriesList = useSelector(
    (state) => state.ProductsReducer.categories
  );
  const dispatch = useDispatch();
  const selected_category = useSelector(
    (state) => state.ProductsReducer.category
  );
  const [searchWord, setSearchWord] = useState("");
  const [sorting, setSorting] = useState("none");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  useEffect(() => {
    if (searchWord === ""&& sorting === "none") {
      dispatch(getProductsList(selected_category));
      dispatch(getCategoriesList());
    }  if(searchWord !== "" && sorting === "none") {
      dispatch(searchProduct(searchWord, selected_category));
    }
    if(sorting !== "none"){
      if(sorting == "ascend"){
        dispatch(sortAscend(ProductsList))
      }
      if(sorting == "descend"){
        dispatch(sortDescend(ProductsList))
      }
      if(sorting == "rating"){
        dispatch(sortRating(ProductsList))
      }
    }
  }, [selected_category, searchWord,sorting]);

  function categoryClick(cat) {
    setSorting("none")
    dispatch(selectGategory(cat._id));
  }
  function searchHandel(e) {
    setSorting("none")
    setSearchWord(e.target.value);
  }

  const handleClickCategory = () => {
    setCategoryOpen(!categoryOpen);
  };
  const handleClickSort = () => {
    setSortOpen(!sortOpen);
  };

  return (
    <Container style={{padding:"0" ,position:"relative"}} fluid className="d-flex flex-column flex-wrap justify-content-end min-vh-100">
      <div className="products-bar">
      
      <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={handleClickCategory}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
            {categoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton onClick={()=> {categoryClick({_id:""})
          setCategoryOpen(!categoryOpen)}} sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItemButton>
            {CategoriesList.map((cat) => {
          return (
            <ListItemButton onClick={()=> {categoryClick(cat)
            setCategoryOpen(!categoryOpen)}} sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={cat.name} />
          </ListItemButton>
          )
        })}
            </List>
          </Collapse>
        </List>
      
          
      
        <TextField
        style={{ width: "70%" }}
        id="outlined-basic"
        label="Product Name"
        value={searchWord}
        variant="outlined"
        onChange={(e) => searchHandel(e)}
      />

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={handleClickSort}>
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary="Sort" />
            {sortOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={sortOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={()=> {setSorting("none");
            setSortOpen(!sortOpen)}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="None" />
              </ListItemButton>
              <ListItemButton onClick={()=> {setSorting("descend");
            setSortOpen(!sortOpen)}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="High to low Price" />
              </ListItemButton>
              <ListItemButton onClick={()=> {setSorting("ascend");
            setSortOpen(!sortOpen)}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Low to high price" />
              </ListItemButton>
              <ListItemButton onClick={()=> {setSorting("rating");
            setSortOpen(!sortOpen)}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="High to low rating" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        
      
      </div >
      
      <Container
      className="d-flex flex-wrap justify-content-around min-vh-100" style={{width:"100%",marginTop:"50px"}}>
      
      
      {ProductsList.map((product) => {
        return <Products_Card product={product}></Products_Card>;
      })}
      </Container>
    </Container>
  );
}

export default Products;
