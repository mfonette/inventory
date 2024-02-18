import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { apiConfig } from 'src/api-config';
import { User } from 'src/app/shared/models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that there are no outstanding requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send list users request', () => {
    const mockResponse: User[] = [{ id: 1, name: 'Test User', job: 'Tester' }];
    const page = 1;
    const pageSize = 10;
    const errorMessage = 'Internal server error';

    service.listUsers(page, pageSize).subscribe((users) => {
      fail('Expected error but got success');
    },
    (error) => {
      expect(error.status).toBe(500);
      expect(error.error.message).toBe(errorMessage);
    });

    const req = httpMock.expectOne(`${apiConfig.baseUrl}${apiConfig.userActions}?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should send create user request', () => {
    const user: User = { id: 1, name: 'Test User', job: 'Tester' };
    const mockResponse: User = { id: 1, name: 'Test User', job: 'Tester' };

    service.createUser(user).subscribe((createdUser: User) => {
      expect(createdUser).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiConfig.baseUrl}${apiConfig.userActions}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    req.flush(mockResponse);
  });

  it('should send update user request', () => {
    const userId = '1';
    const user: User = { id: 1, name: 'Test User', job: 'Tester' };
    const mockResponse: User = { id: 1, name: 'Test User', job: 'Tester' };

    service.updateUser(userId, user).subscribe((updatedUser: User) => {
      expect(updatedUser).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiConfig.baseUrl}${apiConfig.userActions}/${userId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(user);
    req.flush(mockResponse);
  });

  it('should send delete user request', () => {
    const userId = '1';

    service.deleteUser(userId).subscribe(() => {
    });

    const req = httpMock.expectOne(`${apiConfig.baseUrl}${apiConfig.userActions}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
