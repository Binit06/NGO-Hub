import { View, Text, ScrollView } from 'react-native'
import React, { useReducer, useEffect, useState } from 'react'
import NGODATA from '../../datasets/NgoData'
import stringSimilarity from 'string-similarity';
import SearchHeader from '../../components/CustomHeaders/SearchHeader';
import NgoSearch from '../../components/NgoSearch';


const SearchScreen = () => {
    const [searchInput, setSearchInput] = useState('')
    const NGOData = NGODATA
    const handleInputChange = (text: string) => {
        setSearchInput(text)
    }
    const matchingNgo = searchInput
        ? NGOData
            .sort((a, b) => stringSimilarity.compareTwoStrings(searchInput, b.Title) - stringSimilarity.compareTwoStrings(searchInput, a.Title))
            .slice(0, 12)
        : [];

    const matchingNGOTags = searchInput
    ? NGOData
          .sort((a, b) => {
              const similarityA =
                  stringSimilarity.compareTwoStrings(searchInput, a.Category) +
                  stringSimilarity.compareTwoStrings(searchInput, a.Category2);
              const similarityB =
                  stringSimilarity.compareTwoStrings(searchInput, b.Category) +
                  stringSimilarity.compareTwoStrings(searchInput, b.Category2);

              // If both are open or both are not open, prioritize based on similarity
              if (a.open === b.open) {
                  return similarityB - similarityA;
              } else {
                  // If one is open and the other is not, give lower priority to the closed one
                  return a.open ? 1 : -1; // Closed NGOs will have lower priority
              }
          })
          .slice(0, 10)
    : [];

    
      
  return (
    <>
    <SearchHeader onSearchInputChange={handleInputChange}/>
    <View>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        {matchingNgo.length > 0 ? (
            matchingNgo.slice(1).map((ngo, index) => (
                <React.Fragment key={ngo.id}>
                    {index === 0 ? (
                        <>
                        <NgoSearch key={ngo.id} {...ngo} />
                        <View style={{paddingTop: 13, paddingHorizontal: 13}}>
                            <Text style={{fontWeight: '500', color: '#7A7A79'}}>NGOs Similar to Your Search</Text>
                        </View>
                        </>
                    ) : (
                        <NgoSearch key={ngo.id} {...ngo} />
                    )}
                </React.Fragment>
            ))
        ) : (
            <Text></Text>
        )}
      </ScrollView>
    </View>
    </>
  )
}

export default SearchScreen