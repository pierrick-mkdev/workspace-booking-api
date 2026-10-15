namespace WorkSpace.Api.Services;

public interface IFileStorageService
{
    Task<string> UploadFileAsync(IFormFile file);
    Task DeleteFileAsync(string fileUrl);
}