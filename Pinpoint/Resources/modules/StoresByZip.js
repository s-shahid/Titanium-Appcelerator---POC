/*
 * @author Mohammed Shahid
 *  -- Co Author -- Rajeev N B
 */
/* Usage var StoresByZip = require('modules/StoresByZip');
 *              StoresByZip.StoresByZip('95130',function(address){});
 */

exports.StoresByZip = function(zipCode, callback) {

        Ti.App.Properties.setList('AvailableItemsCount', []);
        Ti.App.Properties.setList('AvailableIt', []);
        Ti.App.Properties.setList('UnAvailable', []);

        var name = Ti.App.Properties.getString('name');
        var availableItemsCount = [];
        var resultsData = [];
        var xhr = Ti.Network.createHTTPClient({
                async : true
        });
        //var url = ('http://www.SupermarketAPI.com/api.asmx/StoresByZip?APIKEY=8d0d3a96c3&ZipCode=' + zipCode);
        var url = ('http://www.supermarketapi.com/api.asmx/StoresByCityState?APIKEY=8d0d3a96c3&SelectedCity=San%20Francisco&SelectedState=CA');

        Ti.App.addEventListener('Stop', function(e) {
                xhr.abort();
        });

        if (isAndroid) {
                var dbList = Ti.Database.open('pinpoint');
        } else {
                var dbList = Ti.Database.open('pinpoint.sql');
        }

        xhr.onload = function() {
                Ti.App.addEventListener('Stop', function(e) {
                        xhr.abort();
                });

                try {
                        var doc = this.responseXML.documentElement;
                        var items = doc.getElementsByTagName("Store");
                        var x = 0;

                        for (var c = 0; c < items.length; c++) {
                                var item = items.item(c);
                                var Storename = item.getElementsByTagName("Storename").item(0).text;
                                var Address = item.getElementsByTagName("Address").item(0).text;
                                var city = item.getElementsByTagName("City").item(0).text;
                                var state = item.getElementsByTagName("State").item(0).text;
                                var storeID = item.getElementsByTagName("StoreId").item(0).text;

                                resultsData.push({
                                        storeName : Storename,
                                        address : Address + ' ' + city + ' ' + state,
                                        store_add : Address + city + ' ' + state,
                                        storeID : storeID
                                });
                        }

                        var geo = require('modules/Geocode');
                        for ( i = 0; i < resultsData.length; i++) {
                                geo.forwardGeocode(resultsData[i].address, resultsData[i].storeName, i, function(lat, lon, storeName, index) {
                                        callback(lat, lon, storeName, resultsData[index].storeID, resultsData[index].store_add);
                                });
                        }

                        var itemNames = [];
                        var rows = dbList.execute('select * from itemsList where shopping_name = ? ORDER BY item_category', name);
                        while (rows.isValidRow()) {
                                itemNames.push({
                                        itemName : rows.fieldByName('item_name'),
                                        itemid : rows.fieldByName('item_id'),
                                        image : rows.fieldByName('item_image'),
                                        category : rows.fieldByName('item_category'),
                                        shopping_name : name,
                                        store_id : 120,
                                        aisle_no : '0',
                                        quantity : rows.fieldByName('quantity')
                                });
                                rows.next();
                        }
                        rows.close();

                        for ( i = 0; i < resultsData.length; i++) {
                                availableItemsCount.push(0);
                        }

                        var availableItems = [];
                        var unavailableItems = [];
                        Ti.App.Properties.setList('AvailableItemsCount', availableItemsCount);
                        Ti.App.Properties.setInt('TotalItemsCount', itemNames.length);
                        var FindItemsInStores = require('modules/FindItemsInStores');

                        for ( i = 0; i < resultsData.length; i++) {
                                for ( j = 0; j < itemNames.length; j++) {
                                        FindItemsInStores.FindItemsInStores(resultsData[i].storeID, itemNames[j].itemName, itemNames[j].itemid, i, j, function(available, index, item_index, aisle_No) {
                                                if (available == 'Found') {
                                                        availableItems.push({
                                                                itemName : itemNames[item_index].itemName,
                                                                image : itemNames[item_index].image,
                                                                category : itemNames[item_index].category,
                                                                shopping_name : itemNames[item_index].shopping_name,
                                                                store_id : resultsData[index].storeID,
                                                                aisle_no : aisle_No,
                                                                quantity : itemNames[item_index].quantity
                                                        });

                                                        availableItemsCount[index] = availableItemsCount[index] + 1;
                                                        Ti.App.Properties.setList('AvailableItemsCount', availableItemsCount);

                                                        Ti.App.fireEvent('updateListStoresView', {
                                                                title : Ti.App.Properties.getList('storesInformation')
                                                        });

                                                        Titanium.App.Properties.setList('AvailableIt', availableItems);
                                                } else {
                                                        Ti.App.Properties.setList('AvailableItemsCount', availableItemsCount);
                                                        unavailableItems.push({
                                                                itemName : itemNames[item_index].itemName,
                                                                image : itemNames[item_index].image,
                                                                category : itemNames[item_index].category,
                                                                shopping_name : itemNames[item_index].shopping_name,
                                                                store_id : resultsData[index].storeID,
                                                                aisle_no : aisle_No,
                                                                quantity : itemNames[item_index].quantity
                                                        });
                                                        Titanium.App.Properties.setList('UnAvailable', unavailableItems);
                                                }
                                        });
                                }
                        }

                } catch(E) {
                }
        };
        xhr.open("GET", url);
        xhr.send();
};