package com.dailycodework.dreamshops.Factory;

import com.dailycodework.dreamshops.strategy.MergeSortStrategy;
import com.dailycodework.dreamshops.strategy.QuickSortStrategy;
import com.dailycodework.dreamshops.strategy.SortStrategy;

public class SortFactory {
    
    private static SortFactory sortFactory ;

    private SortFactory(){}

    public static SortFactory getInsatance()
    {
        if(sortFactory == null )
        {
            sortFactory = new SortFactory() ;   
        }

        return sortFactory ;
    }


    public SortStrategy getSortMethod(String name)
    {

        if(name.equals("merge"))
        {
            return new MergeSortStrategy() ;
        }
        else if(name.equals("quick"))
        {
            return new QuickSortStrategy() ;
        }
        else{
            return new MergeSortStrategy() ;
        }
    }

    
}
