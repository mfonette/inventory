import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { apiConfig } from 'src/api-config';
import { AuthSuccessResponse } from 'src/app/shared/models/models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that there are no outstanding requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request', () => {
    const credentials = { username: 'testuser', password: 'testpassword' };
    const mockResponse = { token: 'testtoken' };

    service.login(credentials).subscribe(
      (response) => {
        expect(response).toEqual(mockResponse);
      },
      (error) => {
        fail('Unexpected error: ' + error.message);
      }
    );

    const req = httpMock.expectOne(`${apiConfig.baseUrl}${apiConfig.login}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle HTTP error during login request', () => {
    const credentials = { username: 'testuser', password: 'testpassword' };
    const errorMessage = 'Invalid credentials';

    service.login(credentials).subscribe(
      () => {
        fail('Expected error but got success');
      },
      (error) => {
        expect(error.status).toBe(401);
        expect(error.error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${apiConfig.baseUrl}${apiConfig.login}`);
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
  });

  it('should send signup request', () => {
    const userData = { username: 'testuser', password: 'testpassword' };
    const mockResponse: any = { id: 1, token: 'testtoken' };

    service.signup(userData).subscribe(
      (response: any) => {
        expect(response).toEqual(mockResponse);
      },
      (error) => {
        fail('Unexpected error: ' + error.message);
      }
    );

    const req = httpMock.expectOne(`${apiConfig.baseUrl}${apiConfig.register}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);
    req.flush(mockResponse);
  });

  it('should handle HTTP error during signup request', () => {
    const userData = { username: 'testuser', password: 'testpassword' };
    const errorMessage = 'Invalid user data';

    service.signup(userData).subscribe(
      () => {
        fail('Expected error but got success');
      },
      (error) => {
        expect(error.status).toBe(400);
        expect(error.error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${apiConfig.baseUrl}${apiConfig.register}`);
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });
});
