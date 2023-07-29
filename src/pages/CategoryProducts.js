import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, IonSelect, IonList, IonSelectOption, IonItem } from "@ionic/react";
import { cart, heart, chevronBackOutline, searchOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router"
import ProductCard from "../components/ProductCard";

import { CartStore } from "../data/CartStore";
import { FavouritesStore } from '../data/FavouritesStore';
import { ProductStore } from "../data/ProductStore";

import styles from "./CategoryProducts.module.css";

class TempProduct{
    constructor(price, object){
        this.price = price;
        this.object = object;
    }
}

const CategoryProducts = () => {
    const params = useParams();
    const cartRef = useRef();
    const products = ProductStore.useState(s => s.products);
    const favourites = FavouritesStore.useState(s => s.product_ids);
    const shopCart = CartStore.useState(s => s.product_ids);
    const [ category, setCategory ] = useState({});
    const [ searchResults, setsearchResults ] = useState([]);
    const [ amountLoaded, setAmountLoaded ] = useState(6);

    const sortOptions = ["lToH", "hToL", "aToZ", "zToZ", "None"];
    const currSort = sortOptions[4];

    useEffect(() => {

        const categorySlug = params.slug;
        const tempCategory = products.filter(p => p.slug === categorySlug)[0];
        setCategory(tempCategory);
        setsearchResults(tempCategory.products);
    }, [ params.slug ]);

    const fetchMore = async (e) => {

		//	Increment the amount loaded by 6 for the next iteration
		setAmountLoaded(prevAmount => (prevAmount + 6));
		e.target.complete();
	}

    // Search Bar 
    const search = async e => {

        const searchVal = e.target.value;

        if (searchVal !== "") {
         
            const tempResults = category.products.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()));

            if (currSort === sortOptions[4]){ // i.e. None
                setsearchResults(tempResults);
            }else{
                let productArray = [];
                let sortedProductArray = [];
    
                for(let i = 0; i < tempResults.length; i++){
                    let poundStripped = tempResults[i].price.replace(/£/g, "");
                    const tempProduct = new TempProduct(parseFloat(poundStripped), tempResults[i]);
                    productArray.push(tempProduct);
                }
    
                productArray.sort((a,b) => a.price - b.price);
                for (let i = 0; i < productArray.length; i++){
                    sortedProductArray.push(productArray[i].object);
                }
    
                setsearchResults(sortedProductArray);
            }
           
        } else {
            setsearchResults(category.products);
        }
    }

    // Implementation for Filter by
    const filterBy = (msg) =>{
        console.log(msg);

        const tempResults = category.products;
        let productArray = [];

        if(msg.includes('Black')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Black'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Grey')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Grey'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('White')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'White'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Brown')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Brown'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Beige')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Beige'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Pink')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Pink'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Red')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Red'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Orange')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Orange'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Yellow')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Yellow'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Green')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Green'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        if(msg.includes('Blue')){
            for(let i = 0; i< tempResults.length; i++){
                if(tempResults[i].colour == 'Blue'){
                    productArray.push(tempResults[i]);
                }
            }
        }
        setsearchResults(productArray);
    }
    
    // Implementation for Sort by
    const pushLog = (msg) => {
        console.log(msg);

        let productArray = [];
        let sortedProductArray = [];

        const tempResults = category.products;

        if (msg == "lToH" || msg == "hToL"){
            for(let i = 0; i < tempResults.length; i++){
                let poundStripped = tempResults[i].price.replace(/£/g, "");
                const tempProduct = new TempProduct(parseFloat(poundStripped), tempResults[i]);
                productArray.push(tempProduct);
            }
        
            productArray.sort((a,b) => a.price - b.price);
            for (let i = 0; i < productArray.length; i++){
                sortedProductArray.push(productArray[i].object);
            }
    
            if (msg == "lToH"){
                setsearchResults(sortedProductArray);
            }else{
                sortedProductArray.reverse();
                setsearchResults(sortedProductArray);
            }
        }else{
            for(let i = 0; i < tempResults.length; i++){
                const tempProduct = new TempProduct(tempResults[i].name, tempResults[i]);
                productArray.push(tempProduct);
            }

            productArray.sort((a, b) => {
                if (a.price < b.price) {
                  return 1;
                } else if (a.price > b.price) {
                  return -1;
                } else {
                  return 0;
                }
              });
            for (let i = 0; i < productArray.length; i++){
                sortedProductArray.push(productArray[i].object);
            }

            if (msg == "aToZ"){
                sortedProductArray.reverse();
                setsearchResults(sortedProductArray);
            }else{
                setsearchResults(sortedProductArray);
            }
        } 
    };

    return (

        <IonPage id="category-page" className={ styles.categoryPage }>
            <IonHeader>
				<IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="dark" text={ category.name } routerLink="/" routerDirection="back">
                            <IonIcon color="dark" icon={ chevronBackOutline } />&nbsp;Categories
                        </IonButton>
                    </IonButtons>
					<IonTitle>{ category && category.name }</IonTitle>

                    <IonButtons slot="end">
                        <IonBadge color="danger">
                            { favourites.length }
                        </IonBadge>
						<IonButton color="danger" routerLink="/favourites">
							<IonIcon icon={ heart } />
						</IonButton>

                        <IonBadge color="dark">
                            { shopCart.length }
                        </IonBadge>
						<IonButton color="dark" routerLink="/cart">
							<IonIcon ref={ cartRef } className="animate__animated" icon={ cart } />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen>

                <IonSearchbar className={ styles.search } onKeyUp={ search } placeholder="Try 'high back'" searchIcon={ searchOutline } animated={ true } />
                
                
                <IonList>
                    <IonItem>
                        <IonSelect id="sortBy" label="Stacked label" aria-label="SortBy" interface="popover" placeholder="Sort By" 
                            onIonChange={(e) => pushLog(`${e.detail.value}`)}>
                            <IonSelectOption value="lToH">Price Low to High</IonSelectOption>
                            <IonSelectOption value="hToL">Price High to Low</IonSelectOption>
                            <IonSelectOption value="aToZ">A to Z</IonSelectOption>
                            <IonSelectOption value="zToA">Z to A</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonSelect label="Stacked label" aria-label="Colours" placeholder="Select all colours that apply" multiple="true"
                        onIonChange={(e) => filterBy(`${e.detail.value}`)}>
                            <IonSelectOption value="Black">Black</IonSelectOption>
                            <IonSelectOption value="Grey">Grey</IonSelectOption>
                            <IonSelectOption value="White">White</IonSelectOption>
                            <IonSelectOption value="Brown">Brown</IonSelectOption>
                            <IonSelectOption value="Beige">Beige</IonSelectOption>
                            <IonSelectOption value="Pink">Pink</IonSelectOption>
                            <IonSelectOption value="Red">Red</IonSelectOption>
                            <IonSelectOption value="Orange">Orange</IonSelectOption>
                            <IonSelectOption value="Yellow">Yellow</IonSelectOption>
                            <IonSelectOption value="Green">Green</IonSelectOption>
                            <IonSelectOption value="Blue">Blue</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>

                <IonGrid>

                    <IonRow className="ion-text-center">
                        <IonCol size="12">
                            <IonNote>{ searchResults && searchResults.length } { (searchResults.length > 1 || searchResults.length === 0) ? " products" : " product" } found</IonNote>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        { searchResults && searchResults.map((product, index) => {

                            if ((index <= amountLoaded) && product.image) {
                                return (
                                    <ProductCard key={ `category_product_${ index }`} product={ product } index={ index } cartRef={ cartRef } category={ category } />
                                );
                            }
                        })}
                    </IonRow>
                </IonGrid>

                <IonInfiniteScroll threshold="100px" onIonInfinite={ fetchMore }>
					<IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Fetching more...">
					</IonInfiniteScrollContent>
				</IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
}

export default CategoryProducts;