export const projectQueryKeys = {
  all: ["project"] as const,
  //   near: (radius: string) => ["event", `${radius}-radius`] as const,
  //   lists: () => [...postsKeys.all, 'list'] as const,
  //   list: (filter: string) => [...postsKeys.lists(), filter] as const,
  //   details: () => [...postsKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectQueryKeys.all, id] as const,
  //   myEvents: () => [...eventQueryKeys.all, "me"] as const,
  //   myEventDetail: (id: string) => [...eventQueryKeys.myEvents(), id] as const,
};

export const jobQueryKeys = {
  all: ["job"] as const,
  //   near: (radius: string) => ["event", `${radius}-radius`] as const,
  //   lists: () => [...postsKeys.all, 'list'] as const,
  //   list: (filter: string) => [...postsKeys.lists(), filter] as const,
  //   details: () => [...postsKeys.all, 'detail'] as const,
  detail: (jobId: string) => [...jobQueryKeys.all, jobId] as const,
  //   myEvents: () => [...eventQueryKeys.all, "me"] as const,
  //   myEventDetail: (id: string) => [...eventQueryKeys.myEvents(), id] as const,
};

export const materialQueryKeys = {
  all: ["material"] as const,
  detail: (id: string) => [...materialQueryKeys.all, id] as const,
};
