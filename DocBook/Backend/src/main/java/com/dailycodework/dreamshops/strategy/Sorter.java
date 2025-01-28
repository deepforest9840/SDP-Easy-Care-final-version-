package com.dailycodework.dreamshops.strategy;

import java.util.List;

import com.dailycodework.dreamshops.dto.AppointmentInfoDto;

public class Sorter {
    private SortStrategy sortStrategy;

    public Sorter() {
    
    }

    public Sorter(SortStrategy sortStrategy) {
        this.sortStrategy = sortStrategy;
    }

    public void setSortStrategy(SortStrategy sortStrategy) {
        this.sortStrategy = sortStrategy;
    }

    public List<AppointmentInfoDto> sort(List<AppointmentInfoDto> items) {
        return sortStrategy.Sorting(items);
    }
    
}
