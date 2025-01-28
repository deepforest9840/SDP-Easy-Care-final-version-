package com.dailycodework.dreamshops.strategy ;

import java.util.List;

import com.dailycodework.dreamshops.dto.AppointmentInfoDto;

public class QuickSortStrategy implements SortStrategy {
    @Override
    public List<AppointmentInfoDto> Sorting(List<AppointmentInfoDto> items) {
        if (items == null || items.size() <= 1) {
            return items;
        }
        quickSort(items, 0, items.size() - 1);
        return items;
    }

    private void quickSort(List<AppointmentInfoDto> items, int low, int high) {
        if (low < high) {
            int pi = partition(items, low, high);
            quickSort(items, low, pi - 1);
            quickSort(items, pi + 1, high);
        }
    }

    private int partition(List<AppointmentInfoDto> items, int low, int high) {
        AppointmentInfoDto pivot = items.get(high);
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (items.get(j).getAppointmentDate().compareTo(pivot.getAppointmentDate()) <= 0) {
                i++;
                AppointmentInfoDto temp = items.get(i);
                items.set(i, items.get(j));
                items.set(j, temp);
            }
        }
        AppointmentInfoDto temp = items.get(i + 1);
        items.set(i + 1, items.get(high));
        items.set(high, temp);
        return i + 1;
    }     
}