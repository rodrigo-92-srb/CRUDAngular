import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  //private readonly API = '/assets/courses.json';

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(5000),
      tap((courses) => console.log(courses))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>){
    if(record.id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    console.log('Atualizando curso com ID:', record.id);
    return this.httpClient.put<Course>(`${this.API}/${record.id}`, record).pipe(first());
  }
}
