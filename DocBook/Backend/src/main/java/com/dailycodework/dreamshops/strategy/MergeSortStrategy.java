package com.dailycodework.dreamshops.strategy;

import java.util.ArrayList;
import java.util.List;

import com.dailycodework.dreamshops.dto.AppointmentInfoDto;

public class MergeSortStrategy implements SortStrategy {
    @Override
    public List<AppointmentInfoDto> Sorting(List<AppointmentInfoDto> items) {
        System.out.println("Merge Sort Strategy");

        if (items == null || items.size() <= 1) {
            return items;
        }
        List<AppointmentInfoDto> itemList = new ArrayList<>(items);
        mergeSort(itemList, 0, itemList.size() - 1);
        return itemList;
    }

    private void mergeSort(List<AppointmentInfoDto> items, int left, int right) {
        if (left < right) {
            int middle = (left + right) / 2;
            mergeSort(items, left, middle);
            mergeSort(items, middle + 1, right);
            merge(items, left, middle, right);
        }
    }

    private void merge(List<AppointmentInfoDto> items, int left, int middle, int right) {
        int n1 = middle - left + 1;
        int n2 = right - middle;

        List<AppointmentInfoDto> leftList = new ArrayList<>(n1);
        List<AppointmentInfoDto> rightList = new ArrayList<>(n2);

        for (int i = 0; i < n1; i++) {
            leftList.add(items.get(left + i));
        }
        for (int j = 0; j < n2; j++) {
            rightList.add(items.get(middle + 1 + j));
        }

        int i = 0, j = 0;
        int k = left;
        while (i < n1 && j < n2) {
            if (leftList.get(i).getAppointmentDate().compareTo(rightList.get(j).getAppointmentDate()) <= 0) {
                items.set(k, leftList.get(i));
                i++;
            } else {
                items.set(k, rightList.get(j));
                j++;
            }
            k++;
        }

        while (i < n1) {
            items.set(k, leftList.get(i));
            i++;
            k++;
        }

        while (j < n2) {
            items.set(k, rightList.get(j));
            j++;
            k++;
        }
    }
}
