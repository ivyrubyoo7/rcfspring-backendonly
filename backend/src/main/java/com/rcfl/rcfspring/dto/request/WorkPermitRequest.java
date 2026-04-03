package com.rcfl.rcfspring.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class WorkPermitRequest {

    private Long plantId;

    private List<Long> departmentIds;

    private String zone;
    private String activity;

    private String workCategory;

    private List<PermitPersonnelRequest> personnel;

    private List<PermitSafetyRequest> safetyChecklist;
}