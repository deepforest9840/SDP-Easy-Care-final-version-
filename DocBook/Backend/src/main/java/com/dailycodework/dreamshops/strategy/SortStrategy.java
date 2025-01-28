package com.dailycodework.dreamshops.strategy;

import java.util.List;

import com.dailycodework.dreamshops.dto.AppointmentInfoDto;

public interface SortStrategy {
    List<AppointmentInfoDto> Sorting(List<AppointmentInfoDto> items);
}